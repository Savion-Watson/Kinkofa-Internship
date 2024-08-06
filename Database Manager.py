import csv
from collections import defaultdict

# Rules for .csv files 
'''
- Every entry has at least a Cemetery and a State. 
- Put items in alphbetical order by State BEFORE running the script 
- (Ideally) delete old data before imports. This will prevent Webflow rejections due to relational data
- Import files into Webflow the following order 
    1) Final Cemeteries
    2) city_cemetery 
    3) county_city 
    4) state_county 

'''
# NOTE: Possibly make sure that ALL .csv file data is in ALPHABETICAL ORDER (descending from each column) 
'''Why? - When Webflow looks to grab a repeated non-state value in the relations, it might try to find the first matching names while iterating (down)
    Keeping everything in the correct order *might* ensure that the respective values are retrieved 
    
    Fictional Example: 
    i = {'State': 'Texas', 'County': 'Caldwell', 'City': 'McMahan', 'Cemeteries': {'Fleming Cemetery'}}
    i + 1 =  {'State': 'Texas', 'County': 'Montgomery', 'City': 'McMahan', 'Cemeteries': {'Hooks Cemetery'}}
    
    Since 'Caldwell' would come before 'Montgomery' in alphabetical order, when looking for a McMahan, Webflow might grab the first one, 
    which would logically have 'Fleming Cemetery' and ultimately belong to 'Caldwell' 
    ''' 

# NOTE: Empty values might need to default to _ or '_blank_', as Webflow filters do not accept empty text

# Define file paths 
# All names must match exactly (case-sensitive) 
# Change names or paths as needed
input_file = 'Testing Data\Final TX Cemeteries.csv' 
state_county_file = 'Resulting Data\state_county.csv'
county_city_file = 'Resulting Data\county_city.csv'
city_cemetery_file = 'Resulting Data\city_cemetery.csv'

# Create dictionaries to hold the data
state_county_dict = defaultdict(set)
county_city_dict = defaultdict(set)
city_cemetery_dict = defaultdict(set)  

#Lossy Cemetery Locations 
state_exclusive_dict = defaultdict(set)
county_exclusive_dict = defaultdict(set)

#De-Facto Data
category_dict = defaultdict(lambda: defaultdict(lambda: defaultdict(set)))  


def flatten_dict(d): 
    # Used to put nested values in one line. 
    # This makes it easier to process for writing into the .csv
    for state, counties in d.items():
        for county, cities in counties.items():
            for city, cemeteries in cities.items():
                yield {
                    'State': state,
                    'County': county,
                    'City': city,
                    'Cemeteries': cemeteries
                }




# Read the initial collection file
with open(input_file, mode='r', newline='', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    for row in reader:
        State = row['Cemetery State']
        County = row['Cemetery County']
        City = row['Cemetery City']
        Cemetery = row['Cemetery Name']

        # Populate dictionaries
        state_county_dict[State].add(County) 
        
        # Check if a cemetery only has a State, if so, add to "Exclusive Cemeteries" 
        if (County == ''): 
            state_exclusive_dict[State].add(Cemetery)

        
        county_city_dict[County].add(City) 
        # Check if a cemetery only has a State and County, if so, add to "Exclusive Cemeteries"
        if (City == ''): 
            county_exclusive_dict[State, County].add(Cemetery)

        city_cemetery_dict[City].add(Cemetery) 

        # Create a nested defaultdict
        category_dict[State][County][City].add(Cemetery)  

       

        # NOTE: Cemeteries without a City, County (or State) will have '' for that respective key.  
        '''
        # We can handle these with Webflow filters that (do not) equal ''. The database does not have to have these listed in "Exclusive" columns. 
        # We just need to ensure that each relation only has lists that belong to a specific State, County or City. NOT OF MIX OF MANY 
            Ex: Two states that have 'County':'DeWitt' should NOT have a combination of both their cities in the same cell of 'county_city.csv'
        '''
        

 
processing_dict = list(flatten_dict(category_dict)) #Flattened dictionary for easier processing

# Make just one new .csv with, State, County, City, and Cemeteries. 
# As long as everything after State is a reference, Webflow can correctly interpret nested entries  
'''State: 
    County: 
        City: 
            - Cemetery 
            - Cemetery 
            - Cemetery'''

def oldWriting(): # Has the possibility to put many combinations of non-respective data in the same cell (BAD)
    # Write State, County CSV
    with open(state_county_file, mode='w', newline='', encoding='utf-8') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['State', 'County'])
        for state, counties in state_county_dict.items(): 
            
            # Add State with respective Counties and exclusive cemeteries
            writer.writerow([state, '; '.join(sorted(counties))]) 
        

    # Write County, City CSV
    with open(county_city_file, mode='w', newline='', encoding='utf-8') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['County', 'City'])
        for county, cities in county_city_dict.items():
            writer.writerow([county, '; '.join(sorted(cities)), ', '.join(sorted(county_exclusive_dict[state]))]) 

    # Write City, cemetery CSV
    with open(city_cemetery_file, mode='w', newline='', encoding='utf-8') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['City', 'Cemetery Name'])
        for city, cemeteries in city_cemetery_dict.items():
            writer.writerow([city, '; '.join(sorted(cemeteries))]) 


# Debug Printout
for value in processing_dict: 
    print(value)

''' New Writing ''' 

# NOTE: Webflow seperates different CMS references by semicolons: ' ; '

def slugFormat(text): 
    if (not text): 
        return 'blank'.replace(' ','_').lower()
    
    return text.replace(' ','_').lower()

def make_State_County(): # makes state_county file

    state_county_dict = defaultdict(set)
    for entry in processing_dict:
        state = entry['State']
        county = entry['County']
        state_county_dict[state].add(county) 

    # Write State, County CSV
    with open(state_county_file, mode='w', newline='', encoding='utf-8') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['State', 'County'])
        for state, counties in state_county_dict.items():
            writer.writerow([state, '; '.join( map(str, sorted(counties)) )]) #.join() and .map() ensure clean separation
        
    
def make_County_City(): # makes county_city file

    county_city_dict = defaultdict(set)
    for entry in processing_dict:
        county = entry['County']
        city = entry['City'] 
        state = entry['State'] # Included in order to make proper breadcrumbs and slugs
        county_city_dict[county].add(city) 

    # Write State, County CSV
    with open(county_city_file, mode='w', newline='', encoding='utf-8') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['County', 'City'])
        for county, cities in county_city_dict.items():
            # Check if parameters are not blank strings...?
            slugText = ""
            # Make slugs for each entry
            slugText = (slugFormat(county)+'-'+slugFormat(state)) # May not be getting the correct state at runtime
            
            writer.writerow([county,'; '.join( map(str, sorted(cities) ) ) ])  #.join() and .map() ensure clean separation


def make_City_Cemtery(): # makes city_cemetery file

    city_cemetery_dict = defaultdict(set)
    for entry in processing_dict:
        city = entry['City']
        cemetery = entry['Cemeteries'] 
        
        for value in cemetery:
            county = entry['County']
            city = entry['City'] # Included in order to make proper breadcrumbs and slugs
            state = entry['State'] # Included in order to make proper breadcrumbs and slugs
            city_cemetery_dict[city].add(value) 

    # Write State, County CSV
    with open(city_cemetery_file, mode='w', newline='', encoding='utf-8') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['City', 'Cemetery'])
        for city, cemeteries in city_cemetery_dict.items(): 
            
            # Check if parameters are not blank strings...?
            slugText = ""  
            slugText = (slugFormat(city) + '-' + slugFormat(county) + '-' + slugFormat(state) )  # May not be getting the correct county at runtime
            
            writer.writerow([city, '; '.join(map(str, sorted(cemeteries)) )]) #.join() and .map() ensure clean separation

# Main:
make_State_County() 
make_County_City() 
make_City_Cemtery()
