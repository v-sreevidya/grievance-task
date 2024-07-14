function updatePlaceholder(){
    var dropdown=document.getElementById('reason');
    var selectedOption=dropdown.options[dropdown.selectedIndex];
    if(selectedOption.value==''){
        selectedOption.style.display='none';
    }
}