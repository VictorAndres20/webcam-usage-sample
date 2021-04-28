var webcam = null;

function valid_camera_close(){
    document.getElementById("btn_close").style.display = "block";
    document.getElementById("btn_snap").style.display = "block";
    document.getElementById("btn_open").style.display = "none";
}

function valid_camera_open(){
    document.getElementById("btn_close").style.display = "none";
    document.getElementById("btn_snap").style.display = "none";
    document.getElementById("btn_open").style.display = "block";
}

function start_camera(){
    let webcamElement = document.getElementById('webcam');
    let canvasElement = document.getElementById('canvas');
    let snapSoundElement = document.getElementById('snapSound');
    webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
    webcam.start()
   .then(result =>{
      console.log("webcam started");
      valid_camera_close();
   })
   .catch(err => {
       console.log(err);
   });
}

function stop_camera(){
    webcam.stop()
    valid_camera_open();
}

function take_photo(){
    let picture = webcam.snap();
    console.log(picture);
    img = document.getElementById("item");
    img.src = picture;
    call_api(clean_bytes(picture));
}

function clean_bytes(picture){
    cleaned_bytes = picture.split(",")[1];
    console.log("Bytes cleaned");
    console.log(cleaned_bytes)
    return cleaned_bytes
}

function handledSpinner(visible){
    document.getElementById("spinner").style.display = visible;
}

function showResponde(msg){
    document.getElementById("product-info").innerHTML = msg;
}

function call_api(bytes){
    if(bytes == null){
        alert("No hay foto");
    } else {
        let body = JSON.stringify({data:bytes});
        handledSpinner('block');
        fetch("http://localhost:9002/",{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            //body:body
        })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            handledSpinner("none");
            showResponde(json.data);
        })
        .catch((error) => {
            handledSpinner("none");
            alert(error);
        });
    }
}