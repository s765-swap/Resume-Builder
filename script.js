const formFields = [
    'name', 'title', 'summary', 'email', 'phone', 'location', 'linkedin'
];
const previewMap = {
    'name': 'preview-name',
    'title': 'preview-title',
    'summary': 'preview-summary',
    'email': 'preview-email',
    'phone': 'preview-phone',
    'location': 'preview-location',
    'linkedin': 'preview-linkedin'
};

const inputs = formFields.map(id => document.getElementById(id));
inputs.forEach(input => {
    if (input) {
        input.addEventListener('input', updatePreview);
    }
});

// Add event listeners to dynamic fields
document.getElementById('work-experience-container').addEventListener('input', updatePreview);
document.getElementById('education-container').addEventListener('input', updatePreview);
document.getElementById('skills').addEventListener('input', updatePreview);

function updatePreview() {
    // Update simple fields
    for (const key in previewMap) {
        const inputElement = document.getElementById(key);
        const previewElement = document.getElementById(previewMap[key]);
        if (inputElement && previewElement) {
            if (key === 'linkedin') {
                previewElement.href = inputElement.value;
                previewElement.textContent = inputElement.value ? 'LinkedIn' : '';
            } else {
                previewElement.textContent = inputElement.value || '';
            }
        }
    }

    // Update work experience
    const workContainer = document.getElementById('preview-work-experience');
    workContainer.innerHTML = '';
    document.querySelectorAll('.work-experience-block').forEach(block => {
        const jobTitle = block.querySelector('.job-title').value;
        const company = block.querySelector('.company').value;
        const dates = block.querySelector('.dates').value;
        const descriptionText = block.querySelector('.description').value;
        
        if (jobTitle || company || dates || descriptionText) {
            const descriptionList = descriptionText.split(',').map(item => `<li>${item.trim()}</li>`).join('');

            workContainer.innerHTML += `
                <div class="mb-4">
                    <div class="flex justify-between items-baseline mb-1">
                        <h4 class="font-semibold text-gray-800 text-sm">${jobTitle} at ${company}</h4>
                        <span class="text-xs text-gray-500">${dates}</span>
                    </div>
                    <ul class="list-disc list-inside text-xs text-gray-600 space-y-1 ml-4">
                        ${descriptionList}
                    </ul>
                </div>
            `;
        }
    });

    // Update education
    const educationContainer = document.getElementById('preview-education');
educationContainer.innerHTML = '';
document.querySelectorAll('.education-block').forEach(block => {
    const degree = block.querySelector('.degree').value;
    const university = block.querySelector('.university').value;
    const years = block.querySelector('.years').value;
    
    if (degree || university || years) {
        educationContainer.innerHTML += `
            <div class="mb-2">
                <h4 class="font-semibold text-gray-800 text-sm">${degree}</h4>
                <div class="flex justify-between items-baseline text-xs text-gray-700">
                    <span>${university}</span>
                    <span>${years}</span>
                </div>
            </div>
        `;
    }
});

// Update skills
const skillsContainer = document.getElementById('preview-skills');
const skillsText = document.getElementById('skills').value;
const skillsList = skillsText.split(',').map(skill => `<span class="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full mr-2 mb-2">${skill.trim()}</span>`).join('');
skillsContainer.innerHTML = skillsList;
}

// Functions to add dynamic blocks
function addWorkExperience() {
    const container = document.getElementById('work-experience-container');
    const newBlock = document.createElement('div');
    newBlock.className = "work-experience-block bg-gray-50 p-4 rounded-xl space-y-2";
    newBlock.innerHTML = `
        <input type="text" placeholder="Job Title" class="job-title w-full p-2 border border-gray-300 rounded-lg">
        <input type="text" placeholder="Company" class="company w-full p-2 border border-gray-300 rounded-lg">
        <input type="text" placeholder="Start Date - End Date" class="dates w-full p-2 border border-gray-300 rounded-lg">
        <textarea placeholder="Job Description (comma-separated bullets)" class="description w-full p-2 border border-gray-300 rounded-lg h-20"></textarea>
        <button onclick="this.parentNode.remove(); updatePreview();" class="text-sm text-red-500 hover:text-red-700">Remove</button>
    `;
    container.insertBefore(newBlock, container.lastElementChild);
    updatePreview();
}

function addEducation() {
    const container = document.getElementById('education-container');
    const newBlock = document.createElement('div');
    newBlock.className = "education-block bg-gray-50 p-4 rounded-xl space-y-2";
    newBlock.innerHTML = `
        <input type="text" placeholder="Degree" class="degree w-full p-2 border border-gray-300 rounded-lg">
        <input type="text" placeholder="University" class="university w-full p-2 border border-gray-300 rounded-lg">
        <input type="text" placeholder="Years attended" class="years w-full p-2 border border-gray-300 rounded-lg">
        <button onclick="this.parentNode.remove(); updatePreview();" class="text-sm text-red-500 hover:text-red-700">Remove</button>
    `;
    container.insertBefore(newBlock, container.lastElementChild);
    updatePreview();
}

// Helper: check if preview is only placeholders
function isPreviewMeaningful() {
    const name = document.getElementById('preview-name').textContent.trim();
    const title = document.getElementById('preview-title').textContent.trim();
    const summary = document.getElementById('preview-summary').textContent.trim();
    // Check for default values
    if (
        name === 'Your Name' || name === '' ||
        title === 'Your Job Title' || title === '' ||
        summary === ''
    ) {
        return false;
    }
    // Check if at least one work experience or education or skill is present
    const work = document.getElementById('preview-work-experience').textContent.trim();
    const edu = document.getElementById('preview-education').textContent.trim();
    const skills = document.getElementById('preview-skills').textContent.trim();
    return work.length > 0 || edu.length > 0 || skills.length > 0;
}

// Improved fresher autofill
function fresherAutofill() {
    document.getElementById('name').value = 'Aarav Sharma';
    document.getElementById('title').value = 'Entry-Level Software Engineer';
    document.getElementById('summary').value = 'Results-driven Computer Science graduate with a passion for building scalable web applications and a knack for problem-solving. Strong foundation in software engineering, proven project experience, and excellent communication skills. Ready to contribute fresh ideas and energy to a world-class engineering team.';
    document.getElementById('email').value = 'aarav.sharma@email.com';
    document.getElementById('phone').value = '+91 98765 43210';
    document.getElementById('location').value = 'Bangalore, India';
    document.getElementById('linkedin').value = 'https://linkedin.com/in/aaravsharma';
    document.getElementById('skills').value = 'JavaScript, Python, React, Node.js, SQL, Git, REST APIs, Data Structures, Algorithms, Teamwork, Communication, Leadership';
    // Work experience (project/internship)
    const workContainer = document.getElementById('work-experience-container');
    workContainer.querySelectorAll('.work-experience-block').forEach(block => block.remove());
    addWorkExperience();
    const workBlock = workContainer.querySelector('.work-experience-block');
    workBlock.querySelector('.job-title').value = 'Full Stack Developer (Capstone Project)';
    workBlock.querySelector('.company').value = 'IIT Delhi';
    workBlock.querySelector('.dates').value = 'Jan 2024 - May 2024';
    workBlock.querySelector('.description').value = 'Built a job portal web app for 500+ students,Implemented authentication and real-time chat,Deployed on AWS,Received A+ for project impact';
    // Education
    const eduContainer = document.getElementById('education-container');
    eduContainer.querySelectorAll('.education-block').forEach(block => block.remove());
    addEducation();
    const eduBlock = eduContainer.querySelector('.education-block');
    eduBlock.querySelector('.degree').value = 'B.Tech in Computer Science (CGPA: 8.9/10)';
    eduBlock.querySelector('.university').value = 'Indian Institute of Technology, Delhi';
    eduBlock.querySelector('.years').value = '2020 - 2024';
    updatePreview();
}

// Prevent blank PDF download
function isResumeFilled() {
    return document.getElementById('name').value.trim() !== '' &&
           document.getElementById('email').value.trim() !== '' &&
           document.getElementById('summary').value.trim() !== '';
}

// Attach event listeners for new buttons
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fresher-autofill').addEventListener('click', fresherAutofill);
    // Override PDF download
    document.getElementById('generate-pdf').addEventListener('click', async (e) => {
        updatePreview(); // Force update preview before checking
        if (!isResumeFilled() || !isPreviewMeaningful()) {
            alert('Please fill in your details and ensure the preview is not empty or only placeholders before downloading.');
            e.preventDefault();
            return;
        }
        const resumeElement = document.getElementById('resume-preview');
        if (!resumeElement || resumeElement.offsetHeight === 0 || resumeElement.innerText.trim() === '') {
            alert('Resume preview is empty. Please fill in your details.');
            e.preventDefault();
            return;
        }
        // Use html2canvas and jsPDF
        const { jsPDF } = window.jspdf;
        try {
            const canvas = await html2canvas(resumeElement, { scale: 2 });
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
            // Calculate width/height to fit A4
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
            const pdfWidth = imgWidth * ratio;
            const pdfHeight = imgHeight * ratio;
            pdf.addImage(imgData, 'JPEG', (pageWidth - pdfWidth) / 2, 20, pdfWidth, pdfHeight);
            pdf.save('my-resume.pdf');
        } catch (err) {
            alert('Failed to generate PDF. Try again or use a different browser.');
        }
    });
});

// Initial preview
window.onload = updatePreview;
