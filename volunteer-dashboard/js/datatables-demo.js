$(document).ready(function() {
  $('#dataTable').DataTable({
    bFilter: false,       // Disable search box
    lengthChange: false,  // Disable "Show entries" dropdown
    info: false,          // Disable showing information
    paging: false         
    // Other DataTable options and configurations go here
  });
});
