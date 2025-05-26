// Loading the data
let table;


// Exploring the database button
const exp_btn =  document.getElementById('exp_btn');
const content_box = document.getElementById('content_box');
const header = document.getElementById('header');

exp_btn.addEventListener('click', function () {
  content_box.style.display = 'block';
  scrollToElementWithOffset('filterGovernorate', -40);  // 0 offset is fine

  setTimeout(function () {
    header.style.display = 'none';
  }, 1000);
});


// showing the table data
function renderTableRows(data) {
  const tableBody = $("#dataTable");
  tableBody.empty();

  data.forEach((row, index) => {
    const tr = $("<tr>").css("cursor", "pointer");
    tr.append(`<td>${row.event_date}</td>`);
    tr.append(`<td>${row.disorder_type}</td>`);
    tr.append(`<td>${row.event_type}</td>`);
    tr.append(`<td>${row.sub_event_type}</td>`);
    tr.append(`<td>${row.admin1}</td>`);
    tr.append(`<td>${row.notes}</td>`);
    tr.append(`<td>${row.source}</td>`);

    // On row click, show modal
    tr.on("click", function () {
      showRowDetails(row);
    });

    tableBody.append(tr);
  });
}

  const type_data = {
    Demonstrations: {
      Protests: ['Peaceful protest', 'Protest with intervention'],
      Riots: ['Violent demonstration']
    },

    Political_violence: {
      Battles: ['Armed clash', 'Government regains territory'],
      Explosions_Remote_violence: ['Air/drone strike', 'Grenade', 'Remote explosive/landmine/IED', 'Shelling/artillery/missile attack', 'Suicide bomb'],
      Riots: ['Mob violence'],
      Violence_against_civilians: ['Abduction/forced disappearance', 'Attack', 'Sexual violence']

    },
    
      Political_violence_Demonstrations: {
      Protests: ['Excessive force against protesters']
    },

      Strategic_developments: {
      Strategic_developments: ['Agreement', 'Arrests', 'Change to group/activity', 'Disrupted weapons use', 'Headquarters or base established', 'Looting/property destruction', 'Non-violent transfer of territory', 'Other']
    }
  };


// Working on the type selections filters
const type1 = document.getElementById('filterType1');
const type2 = document.getElementById('filterType2');
const type3 = document.getElementById('filterType3');

// Helper to populate select options
function populateSelect(selectElement, options) {
  selectElement.innerHTML = '<option value="">All</option>';
  for (let key of options) {
    selectElement.innerHTML += `<option value="${key}">${key}</option>`;
  }
}

// When select1 changes
type1.addEventListener('change', () => {

  if (type1.value == 'All'){
    type2.disabled = true;
    type3.disabled = true;
    
    type2.innerHTML = '<option value="">All</option>'
    type3.innerHTML = '<option value="">All</option>'
  }

  else {
      type2.disabled = false;
      const state1 = type1.value ? Object.keys(type_data[type1.value.replace(" ", "_").replace(";", "").replace("/", "_")]) : [];
      populateSelect(type2, state1);
      populateSelect(type3, []);

  }

});


// When type2 changes
type2.addEventListener('change', () => {
  if (type2.value == ''){
    type3.disabled = true;
    type3.innerHTML = '<option value="">All</option>'
  }
  
  else {
    type3.disabled = false;
    const state2 = type1.value && type2.value ? type_data[type1.value.replace(" ", "_").replace(";", "").replace("/", "_")][type2.value.replace(" ", "_").replace(";", "").replace("/", "_")] : [];
    populateSelect(type3, state2);
  }

});


const mapFrame = document.getElementById("mapFrame");
$(document).ready(function () {
  // Show only the first 100 rows initially
  const initialData = database.slice(0, 100);
  renderTableRows(initialData);

  // Initialize DataTable
  table = $('#excelTable').DataTable({
    paging: true,
    searching: false,
    info: false,
    language: {lengthMenu: "Show _MENU_"}
  });


  // Filter button handler
$("#filter").on("change", function () {
    const filterGov = $("#filterGovernorate").val().toLowerCase();
    const filterType1 = $("#filterType1").val().toLowerCase();
    const filterType2 = $("#filterType2").val().toLowerCase();
    const filterType3 = $("#filterType3").val().toLowerCase();
    const startDate = $("#startDate").val(); // Assuming this is in YYYY-MM-DD format
    const endDate = $("#endDate").val();     // Assuming this is in YYYY-MM-DD format
    const keyword = $("#keywordFilter").val().toLowerCase(); // New keyword input
    
    filteredData = database.filter(row => {
        // Governorate filter
        const govMatch = filterGov === "all" || 
                         !filterGov || 
                         row.admin1.toString().toLowerCase().includes(filterGov);
        
        // Type filter
        const typeMatch1 = filterType1 === "all" || 
                          !filterType1 ||
                          (row.disorder_type.replace("; ", "_").replace("/", "_").replace(" ", "_") && row.disorder_type.replace("; ", "_").replace("/", "_").replace(" ", "_").toString().toLowerCase().includes(filterType1));
        
        const typeMatch2 = filterType2 === "all" || 
              !filterType2 ||
              (row.event_type.replace("; ", "_").replace("/", "_").replace(" ", "_").replace(" ", "_") && row.event_type.replace("; ", "_").replace("/", "_").replace(" ", "_").replace(" ", "_").toString().toLowerCase().includes(filterType2));

                      
        const typeMatch3 = filterType3 === "all" || 
              !filterType3 ||
              (row.sub_event_type && row.sub_event_type.toString().toLowerCase().includes(filterType3));

        // Date range filter
        let dateMatch = true;
        if (startDate && endDate && row.Date) {
            const rowDate = new Date(row.Date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            dateMatch = rowDate >= start && rowDate <= end;

        }
        
        const keywordMatch = !keyword || (
            row.title?.toLowerCase().includes(keyword) ||
            row.description?.toLowerCase().includes(keyword) ||
            row.notes?.toLowerCase().includes(keyword)
        );

        return govMatch && typeMatch1 && typeMatch2 && typeMatch3 && dateMatch && keywordMatch;
    });
    

    table.clear().draw();            // Clear DataTable
    renderTableRows(filteredData);   // Re-render
    table.rows.add($('#dataTable tr')).draw(); // Re-add filtered rows

    mapFrame.contentWindow.postMessage({ type: "updateMap", data: filteredData }, "*")
  });
});




document.getElementById('showMapBtn').addEventListener('click', () => {
  document.getElementById('tableContainer').style.display = 'none';
  document.getElementById('mapContainer').style.display = 'block';
});

document.getElementById('showTableBtn').addEventListener('click', () => {
  document.getElementById('tableContainer').style.display = 'block';
  document.getElementById('mapContainer').style.display = 'none';
});


function scrollToElementWithOffset(id, offset) {
  const element = document.getElementById(id);
  const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}


