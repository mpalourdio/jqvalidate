jqvalidateform

Quick and dirty jquery plugin that check if form fields are filled, checked, selected

    jquery form validation plugin
    dirty js and worst practices
    specify 'class=req' to the form elements you want to be checked by the plugin
    specify 'rel="req"' to the labels of the elements for automatic '*' adding
    
```javascript
$(document).ready(function() { 
    $("#myformid").jqvalidateform({ 
        messageforrequire : "omgwtfbbq!" // optionnal message 
    }); 
});
```
