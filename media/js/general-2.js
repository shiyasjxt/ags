$(document).ready(function(){
     /*File upload buttons*/
        $("#item8_file_1").on('change', function() {
            document.getElementById("attached-resume").value = this.value;
        });
})