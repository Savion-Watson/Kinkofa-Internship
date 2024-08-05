function findAdditionalImage(num) {
  let slideNum = document.getElementById(`slide-${num}`); //change depending on slider position "slide-#"
  let images =
    "{{wf {&quot;path&quot;:&quot;additional-images&quot;,&quot;type&quot;:&quot;PlainText&quot;} }}".split(
      ", "
    ); //Additional Images from CMS as an array
  let imageURL = `${images[parseInt(slideNum.id.slice(-1)) - 1]}`; //Automatically finds correct array position from # in "slide-#"

  console.log("images array: ", images);
  console.log("imageURL", imageURL);
  slideNum.src = images[parseInt(slideNum.id.slice(-1)) - 1];
}
