import info from '../info.json' with { type: "json" };
import { sleep } from './Helper.js';
import { displayTrivia } from './Trivia.js';

const outputDiv = document.getElementById("output");
const inputField = document.getElementById("input");
const terminal = document.getElementById("terminal");
const body = document.body

function displayOutput(output) {
    outputDiv.innerHTML += `<span style="line-height:1.5;">${output}<br></span>`;
}

function displayHelp() {
    outputDiv.innerHTML += `
        <pre style="line-height:0;"> 
  <span id="commandOptions" >about</span>              <span>Who is Thai?<br></span>
  <span id="commandOptions" >projects</span>           <span>View coding projects<br></span>
  <span id="commandOptions" >social</span>             <span>Display social media links<br></span>
  <span id="commandOptions" >help</span>               <span>Displays available commands<br></span>
  <span id="commandOptions" >banner</span>             <span>Display the header<br></span>
  <span id="commandOptions" >trivia</span>             <span>Get a random general knowledge trivia question<br></span>
  <span id="commandOptions" >clear</span>              <span>Clear the terminal<br></span>
  <span id="commandOptions" >exit</span>               <span>Close the terminal site<br></span>
        </pre>
    `;
}

let socialSectionCounter = 1;
async function displaySocial () {
    const bottomofoutput = document.getElementById("bottomofoutput");
    
    const sectionId = `social_${socialSectionCounter++}`
    outputDiv.innerHTML += `
    <span style="line-height:1.5;" id="${sectionId}">
    </span>
    `

    const social_section = document.getElementById(sectionId);
    for (let i = 0; i < info.socials.length; i++) {
        bottomofoutput.scrollIntoView();
        await sleep(20)
        social_section.innerHTML += `&nbsp&nbsp🔗<span id="socialOptions" >&nbsp<a href=${info.socials[i].url} target="_blank" id="${sectionId}_${i}"></a></span><br>`
        const social_type = document.getElementById(`${sectionId}_${i}`);
        for (let j = 0; j < info.socials[i].type.length; j++) {
            await sleep(20)
            social_type.textContent += info.socials[i].type[j]
            bottomofoutput.scrollIntoView();
        }
    }

}

let projectSectionCounter = 1;
async function displayProjects () {
    const bottomofoutput = document.getElementById("bottomofoutput");

    const sectionId = `projects_${projectSectionCounter++}`
    outputDiv.innerHTML += `
    <span style="line-height:1.5;" id="${sectionId}">
    </span>
    `

    const project_section = document.getElementById(sectionId);
    for (let i = 0; i < info.projects.length; i++){
        bottomofoutput.scrollIntoView();
        await sleep(20)
        project_section.innerHTML += `<span class="projectName" id="${sectionId}_${i}">&nbsp&nbsp${i+1}.&nbsp</span><br>`;
        const project = document.getElementById(`${sectionId}_${i}`)

        for (let j = 0; j < info.projects[i].name.length; j++) {
            await sleep(20)
            project.innerHTML += info.projects[i].name[j]
            bottomofoutput.scrollIntoView();
        }
    }
    let instruction = "Enter a number to read more about that project.";
    project_section.innerHTML += "<br>&nbsp&nbsp";
    for (let k = 0; k < instruction.length; k++) {
        await sleep(20)
        project_section.innerHTML += instruction[k];
        bottomofoutput.scrollIntoView();
    }
    project_section.innerHTML += "<br>";
    bottomofoutput.scrollIntoView();
    await sleep(50);
}

let projectInfoSectionCounter = 1;
async function displayProjectInfo (num) {
    const bottomofoutput = document.getElementById("bottomofoutput");

    const sectionId = `project_info_${projectInfoSectionCounter++}`
    outputDiv.innerHTML += `
    <span style="line-height:1.5;width:60%;display:block" id="${sectionId}"></span>
    `

    const p_info_section = document.getElementById(sectionId);
    for (let i = 0; i < info.projects[num].name.length; i++) {
        bottomofoutput.scrollIntoView();
        await sleep(20);
        p_info_section.innerHTML += info.projects[num].name[i]
    }
    p_info_section.innerHTML += '<br>'

    for (let j = 0; j< info.projects[num].description.length; j++) {
        bottomofoutput.scrollIntoView();
        await sleep(20);
        p_info_section.innerHTML += info.projects[num].description[j]
    }
    p_info_section.innerHTML += '<br>'
}


let aboutSectionCounter = 1; // Initialize a counter
async function displayAbout() {
    // Generate a unique ID for the about section
    const sectionId = `aboutme_${aboutSectionCounter++}`;
    const bottomofoutput = document.getElementById("bottomofoutput");
    
    outputDiv.innerHTML += `
    <span style="line-height:1.5;" id="${sectionId}">
    </span>
    `
      
    const aboutSentence = document.getElementById(sectionId);
    let skip = false;
    for (let i = 0; i < info.about.length; i++) {
        await sleep(0.5);
        if (info.about[i] === "<") {
            aboutSentence.innerHTML += `<br>`;
            skip = true
            bottomofoutput.scrollIntoView();
            continue;
        }

        if (info.about[i] === ">") {
            skip = false;
            continue;
        }

        if (!skip) {
            aboutSentence.innerHTML += info.about[i]
        }
        bottomofoutput.scrollIntoView();
      }
      aboutSentence.innerHTML += `<br>`;
}

  

function displayBanner() {
          outputDiv.innerHTML += `
      <pre>
        ████████╗██╗  ██╗ █████╗ ██╗    ███╗   ██╗ ██████╗ ██╗   ██╗██╗   ██╗███████╗███╗   ██╗
        ╚══██╔══╝██║  ██║██╔══██╗██║    ████╗  ██║██╔════╝ ██║   ██║╚██╗ ██╔╝██╔════╝████╗  ██║
           ██║   ███████║███████║██║    ██╔██╗ ██║██║  ███╗██║   ██║ ╚████╔╝ █████╗  ██╔██╗ ██║
           ██║   ██╔══██║██╔══██║██║    ██║╚██╗██║██║   ██║██║   ██║  ╚██╔╝  ██╔══╝  ██║╚██╗██║
           ██║   ██║  ██║██║  ██║██║    ██║ ╚████║╚██████╔╝╚██████╔╝   ██║   ███████╗██║ ╚████║
           ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝    ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═══╝
      </pre>
        <span style="line-height: 2;">Welcome to my interactive web portfolio/terminal.<br></span>                        
        <span>For a list of available commands, type <span id="help-text">'help'</span>.<br></span>`
}

function close_window() {
    window.close()
  }
  
async function exec(command, recent_command) {
    // console.log (`command: ${command} | recent: ${recent_command}`);

    if (command === 'clear') {
        outputDiv.innerHTML = "";
    } else if (command === 'help') {
        displayHelp();
    } else if (command === 'banner') {
        displayBanner();
    } else if (command === 'social') {
        await displaySocial();
    } else if (command === 'projects') {
        await displayProjects();
    } else if (command === 'about') {
        await displayAbout();
    } else if (command === 'exit') {
        close_window();
    } else if (command === 'trivia') {
        await displayTrivia();
    }
    else if (command === '1' && recent_command === 'projects') {
        displayProjectInfo(0);
    }
    else if (command === '2' && recent_command === 'projects') {
        displayProjectInfo(1);
    }
    else if (command === '3' && recent_command === 'projects') {
        displayProjectInfo(2);
    } 
    // else if (command === 'ls') {
    //     await displayProjects();
    //     await displaySocial();

    // }
    else {
        displayOutput(`Command not recognized. <span>For a list of available commands, type <span id="help-text">'help'</span>.</span>`);
    }
}

export { exec, displayOutput}