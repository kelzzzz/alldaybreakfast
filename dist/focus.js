const pages =
  {
   help:'pages/help.html',
   '-h':'pages/help.html',
   '-abt':'pages/about.html',
   about:'pages/about.html',
   unrecognized:'Sorry, I don\'t know that command. Try \'help\' for instructions using this site!'
  };

const messages = ["Here you go...", "Fetching...", "Got it..."]

document.addEventListener("click", () => {
  document.getElementById("terminal").focus();
});

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        var key = JSON.parse(JSON.stringify(document.getElementById('terminal').value)).trim();
        document.getElementById('terminal').value = "";

        if(pages[key] === undefined){
            document.getElementById('resp').value = pages['unrecognized'];
            document.getElementById('cont').src = 'pages/empty.html';
        }else{
            document.getElementById('resp').value = messages[Math.floor(Math.random()*messages.length)];;
            document.getElementById('cont').src = pages[key];}

        var el = document.getElementById('resp');
        el.style.animation = 'none';
        el.offsetHeight;
        el.style.animation = null; 
    }
});

function getContentFromTxt(filename){
    fetch(filename)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(textData => {
        const textFileContent = textData;
        console.log('Text file loaded:', textFileContent);
        document.getElementById('resp').value = textFileContent;
    })
    .catch(error => {
        document.getElementById('resp').value = "err";
    });
}