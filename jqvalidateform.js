/* 
 * plugin jquery de validation de form
 * 10/2012
 */

(function( $ ){
    console.log($);
    $.fn.jqvalidateform = function(options) {
        var defaults = {
            messageforrequire :  'Vous devez renseigner ce champ !'
        }

        var settings = $.extend({}, defaults, options);
   
        $('label[rel="req"]', $(this)).each(function() {
            //on concatène une astérisque à droite du label
            $(this).append('<span style="color:red"> *</span>');
        });
        //pour chaque champ qui contient la classe "req" on test si il est renseigné,coché, selecté etc.
        //sur le submit
        $(this).submit(function() {    
            var returnbool = true;
            //on delete tous les avertissements précedénts
            $($('#'+$(this).attr('id')+'>span[rel="messageforrequire"]')).remove();
            var arr_chekradio = new Array();
            //message d'alerte qui apparait au submit
            var messageforrequire = '<span style="color:blue;margin-left:5px;" rel="messageforrequire"> '+settings.messageforrequire+' </span>';
            $('.req', $(this)).each(function() {
                //input text / textarea / password
                if($(this).attr("type")=="text" || $(this).attr("type")=="password" || $(this).get(0).tagName.toLowerCase()=="textarea")
                {
                    //on ajoute un handler sur les champs après submit pour supprimer le messageforrequire et le border .error
                    $(this).bind('keyup focusout',function() {
                        if($.trim($(this).val())!="")
                        {
                            $(this).next('span[rel="messageforrequire"]').remove();
                            $(this).removeClass('error');
                        }
                        else
                        {
                            $(this).next('span[rel="messageforrequire"]').remove();
                            $(messageforrequire).insertAfter($(this));
                            $(this).addClass('error');
                        }
                    });
                    //si au submit le champ n'est pas renseigné
                    if($.trim($(this).val())=="")
                    {
                        $(messageforrequire).insertAfter($(this));
                        $(this).addClass('error');
                        returnbool = false;
                    }
                }
                //checkbox radio
                if($(this).attr("type")=="checkbox" || $(this).attr("type")=="radio")
                {
                    var checkradioname = $(this).attr("name");
                    //event handler sur le onclick des checkbox et radio
                    $('input[name="'+checkradioname+'"]').click(function() {
                        if($('input[name="'+checkradioname+'"]:checked').length > 0)
                        {
                            $('input[name="'+checkradioname+'"]').next('span[rel="messageforrequire"]').remove();
                        }
                        else
                        {
                            $('input[name="'+checkradioname+'"]').next('span[rel="messageforrequire"]').remove();
                            $(messageforrequire).insertAfter($('input[name="'+checkradioname+'"]').last());
                        }
                    });
                    
                    if($('input[name="'+checkradioname+'"]:checked').length ==0)
                    {
                        if($.inArray(checkradioname,arr_chekradio) == -1)
                            arr_chekradio.push(checkradioname);
                        returnbool = false;
                    }
                }
                //si c'est un tag select / select multiple
                if($(this).get(0).tagName.toLowerCase()=="select")
                {
                    $(this).change(function() {
                        if(($(this).get(0).selectedIndex == 0 && $(this).attr("multiple") != "multiple") || $(this).get(0).selectedIndex == -1 || $(this).val() == null)
                        {
                            $(this).next('span[rel="messageforrequire"]').remove();
                            $(messageforrequire).insertAfter($(this));
                            $(this).addClass('error');
                        }
                        else
                        {
                            $(this).next('span[rel="messageforrequire"]').remove();
                            $(this).removeClass('error');
                        }
                    });
                    if( ($(this).get(0).selectedIndex == 0 && $(this).attr("multiple") != "multiple") || $(this).get(0).selectedIndex == -1 || $(this).val() == null )
                    {
                        $(messageforrequire).insertAfter($(this));
                        $(this).addClass('error');
                        returnbool = false;
                    }
                }
            });
            //on traite les radio/checkbox
            console.log($(this));
            for( var i = 0, length = arr_chekradio.length; i < length; i++ )
                $(messageforrequire).insertAfter($('#'+$(this).attr('id')+'>input[name="'+arr_chekradio[i]+'"]').last());
      
            return returnbool;
        });
    };
})(jQuery);