document.addEventListener("DOMContentLoaded", () => {
    const programList = document.getElementById("programList");
    const levelSelect = document.getElementById("levelSelect");
    const loadProgramsButton = document.getElementById("loadPrograms");

    // Fetch JSON data
    fetch("../data/programs.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch program data");
            }
            return response.json();
        })
        .then(data => {
            const programs = data.programs;

            // Function to filter and display programs based on selected level
            const loadPrograms = () => {
                const selectedLevel = levelSelect.value;

                // Clear previous list
                programList.innerHTML = '';

                // If no level is selected, show a message
                if (!selectedLevel) {
                    programList.innerHTML = `<li class="list-group-item text-danger">Please select a level to load programs.</li>`;
                    return;
                }

                // Filter programs by selected level
                const filteredPrograms = programs.filter(program => program.level === selectedLevel);

                // If no programs found for the selected level
                if (filteredPrograms.length === 0) {
                    programList.innerHTML = `<li class="list-group-item text-danger">No programs found for the selected level.</li>`;
                    return;
                }

                // Create and append list items for each filtered program
                filteredPrograms.forEach((program, index) => {
                    const listItem = document.createElement("li");
                    listItem.className = "list-group-item d-flex justify-content-between align-items-center";

                    const programDetails = document.createElement("div");
                    programDetails.innerHTML = `
                        <strong>${program.name}</strong>
                        <pre class="mb-1" style="display:none;" id="description-${index}">${program.description}</pre>
                        <pre class="bg-light p-2 rounded" style="display:none;" id="code-${index}"></pre>
                    `;

                    const actions = document.createElement("div");
                    actions.className = "btn-group";

                    // Description Button
                    const toggleDescriptionBtn = document.createElement("button");
                    toggleDescriptionBtn.className = "btn btn-primary btn-sm";
                    toggleDescriptionBtn.innerText = "View Description";
                    toggleDescriptionBtn.onclick = () => {
                        const desc = document.getElementById(`description-${index}`);
                        desc.style.display = desc.style.display === "none" ? "block" : "none";
                    };

                    // Code Button
                    const showCodeBtn = document.createElement("button");
                    showCodeBtn.className = "btn btn-secondary btn-sm";
                    showCodeBtn.innerText = "Show Code";
                    showCodeBtn.onclick = () => {
                        const code = document.getElementById(`code-${index}`);
                        if (code.style.display === "none") {
                            code.style.display = "block";
                            code.innerText = program.code;
                        } else {
                            code.style.display = "none";
                        }
                    };

                    actions.appendChild(toggleDescriptionBtn);
                    actions.appendChild(showCodeBtn);

                    listItem.appendChild(programDetails);
                    listItem.appendChild(actions);
                    programList.appendChild(listItem);
                });
            };

            // Load programs on button click
            loadProgramsButton.addEventListener("click", loadPrograms);
        })
        .catch(error => {
            console.error("Error loading program data:", error);
            programList.innerHTML = `<li class="list-group-item text-danger">Failed to load program list.</li>`;
        });
});
