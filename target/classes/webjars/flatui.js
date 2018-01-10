
$(function(){
    $.ajax({
        url : "v2/api-docs",
        dataType : "json",
        type : "get",
        async : false,
        success : function(data) {
            //layui init
            layui.use([ 'layer','jquery', 'element' ], function() {
	            var $ = layui.jquery, layer = layui.layer, element = layui.element;
	        });
            var jsonData = eval(data);
            
            $("#swagger-flat-title").html(jsonData.info.title);
            $("#swagger-flat-desption").html(jsonData.info.description);
            
            //tags
            var data = {  
                    list : jsonData.tags
                };  
            var treeHtml = template('swagger-flat-template-tags',data);
            
           
            $('#swagger-flat-tree').html(treeHtml);
            
            //paths
            var pathdata = {  
                    list : jsonData.tags
            };  
            var pathHtml = template('swagger-flat-template-paths',pathdata);
            //$('#swagger-flat-tree').html(treeHtml);
            

            for(var path in jsonData.paths){

            	 alert(jsonData.paths[path].get(0));

            }
            
          
            
            
            
            
            $("[name='a_path']").click(function(){
	            var path = $(this).attr("path");
	            var method = $(this).attr("method");
	            var operationId = $(this).attr("operationId");
	            $.each(jsonData.paths[path],function(i,d){
	              if(d.operationId == operationId){
                      d.path = path;
                      d.method = method;
		              $("#path-body").html(tempBody.render(d));
                      var modelName = getResponseModelName(d.responses["200"]["schema"]["$ref"]);
                      if(modelName){
                        $("#path-body-response-model").html(tempBodyResponseModel.render(jsonData.definitions[modelName]));
                      }
	              }
	            });
	        });
	        
	        
	       $("[name='btn_submit']").click(function(){
                var operationId = $(this).attr("operationId");
                var parameterJson = {};
                $("input[operationId='"+operationId+"']").each(function(index, domEle){
                    var k = $(domEle).attr("name");
                    var v = $(domEle).val();
                    parameterJson.push({k:v});
                });
            });
        }
    });
    
});
