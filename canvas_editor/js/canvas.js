
//  
//                                  _oo8oo_
//                                 o8888888o
//                                 88" . "88
//                                 (| -_- |)
//                                 0\  =  /0
//                               ___/'==='\___
//                             .' \\|     |// '.
//                            / \\|||  :  |||// \
//                           / _||||| -:- |||||_ \
//                          |   | \\\  -  /// |   |
//                          | \_|  ''\---/''  |_/ |
//                          \  .-\__  '-'  __/-.  /
//                        ___'. .'  /--.--\  '. .'___
//                     ."" '<  '.___\_<|>_/___.'  >' "".
//                    | | :  `- \`.:`\ _ /`:.`/ -`  : | |
//                    \  \ `-.   \_ __\ /__ _/   .-` /  /
//                =====`-.____`.___ \_____/ ___.`____.-`=====
//                                  `=---=`
//  
//  
//       		  ~~~~~~~Created by duys on 2017/6/21.~~~~~~~
// 
//                          佛祖保佑         永无bug

    $(function(){
       	(function(){
	      	var x,y,endX,endY;
	      	var times = 0;
	      	var times1 = 0;
    	  	origin={x:0,y:0}
		  	end={x:0,y:0}
	      	//前进 撤销
	      	var history =new Array();
    	  	var cStep = -1;
    	  	drawable=false;
    	  	// 输入框
	      	var lineTip = $("#container").appendLine({width:"1px",type:"solid",color:"red",beginX:0,beginY:0,endX:1,endY:1});
	      	var rectTip = $(" <div style='border:1px solid gray;width:1px;height:1px;position:absolute;display:none;'></div>");
	      	var fontTip =$("<textarea rows='3' cols='20' style='background:transparent;position:absolute;display:none;'></textarea>"); 
	      	$("#container").append(rectTip);
	      	$("#container").append(fontTip);
	      
	      
	      	var flag = false;
	      	var canvas=document.getElementById("myCanvas");
	      	var canvas1=document.getElementById("myCanvas1")
	      	var offset = $("#myCanvas").offset();
	      	var ctx = canvas.getContext("2d");
	      	var ctx1 = canvas1.getContext("2d");
	      	clearCanvas();
	      	var canvasWidth = canvas.width;
	      	var canvasHeight = canvas.height;
	      	canvas_size={x:canvasWidth,y:canvasHeight};
	      	canvas_offset={x:$(canvas)[0].offsetLeft,y:$(canvas)[0].offsetTop};
		        
	        $(canvas1).bind('mousedown',function(event){
	        	if (command==7) {
		      		drawable=true;
	      			origin.x=endX;
	        		origin.y=endY;
	        		end.x=endX;
		        	end.y=endY;
		        	times1 = times;
		        	
	      		}
				
			});

		 	$(canvas1).bind('mouseup',function(event){
		 		canvas_backup=ctx.getImageData(0, 0, canvas1.width, canvas1.height);
		 	});

	      	$(document).bind('mouseup',function(event){
				
				ctx1.clearRect(0,0,canvas_size.x,canvas_size.y);
				if (drawable==true && command==7) {
					drawable = false
					end.x=endX;
		        	end.y=endY;
					times++
					drawCircle(ctx)
				}
				
			});
	        $(document).bind("mousemove",function(event){
	        	if (command == 7) {
	        		
		            if(drawable==false)return;
		            if (times == times1) {
		            	ctx1.clearRect(0,0,canvas_size.x,canvas_size.y);
		            }
	            	end.x=endX;
				    end.y=endY;
	            	drawCircle(ctx1)
	            }
	        });


	      	/**
	       	* 工具栏的每个方法对应一个code:
	       	* --------------------------------------------------
	       	* function			command code		description
	       	* --------------------------------------------------
	       	* brash(pencil)			1				用铅笔画画 
	       	* eraser					2				用它来擦除一些污点
	       	* trash					3 				清除画布上的图案
	       	* draw line				4				画直线
	       	* draw rectangle			5				画矩形
       		* draw words				6				在画布上输入文字			
	       	* draw circle  		    7               画圆形
	       	*/
		      
		      
	      	// 工具栏中每个工具都有不同图标样式
	      	// 创建一个回调列表 .....
      		// 1.	切换画布上下文
      		// 2. 当鼠标在画布上时，切换光标样式 
	      	var command = 1;
	      	var commandCallbacks = $.Callbacks();
	      	commandCallbacks.add(switchCanvasContext);
	      	commandCallbacks.add(switchCursorStyle);
	      
	      	// 默认为画笔工具,
	      	$("#tools_pencil").trigger("click");
	      	commandCallbacks.fire(command);
	      	
	      	/**
      		 * 想要编辑图片时，把图片加入到页面中 
      		 *
          	$(".drawImg").click(function(){
          		this.crossOrigin = "Anonymous";
      			ctx.drawImage(this, 0, 0);
	      	})
	      	
	      	$(".viewPhotos").click(function(){
				$img = $(this).prev()[0];
				$("#adjustment").attr("src",$img.src)
				var dw = $("#adjustment").width();
				var dh = $("#adjustment").height();
				
			  	
			  	
				canvas_size={x:dw,y:dh};
				canvas.width = dw;
				canvas.height = dh;
				canvas1.width = dw;
				canvas1.height = dh;
				$(canvas).css({width:dw,height:dh})
				$(canvas1).css({width:dw,height:dh})
				
				
				clearCanvas();
				$img = $(this).prev()[0];
				
				$img.crossOrigin = "Anonymous";
				ctx.drawImage($img, 0, 0,dw,dh);

				initUI(dw,dh);
				
			})
			*/
	      	initUI();

	      	// 初始化判断当前选择的工具类型
	      	$("[name='toolsOption']").change(function(){
	    	  	var val = $(this).val();
	    	  	var type = $(this).attr("id");
	    	  	if("on" == val){    
	    		  	switch(type){
		    		  	case "tools_pencil"		:{command=1;break;}
		    		  	case "tools_eraser"		:{command=2;break;}
		    		  	case "tools_trash"		:{command=3;break;}
		    		  	case "tools_line"		:{command=4;break;}
		    		  	case "tools_rectangle"	:{command=5;break;}
		    		  	case "tools_circle"		:{command=6;break;}
		    		  	case "tools_rotundity"  :{command=7;break;}
		    		  	default 				:{command=1;};
	    		  	}

	    		  	//初始化样式
	    		  	commandCallbacks.fire(command);
	    	  	}	
	      	});
		      
	     	$("#container").mousemove(mouseMoveEventHandler);
		      
	      	/**
	       	 * 切换画图工具时，使用不同的方法
	       	 */
	      	function mouseMoveEventHandler(e) {
	          	switch(command){
		          	case 1	:	{	drawPencil(e);break; }
		          	case 2	:	{	drawPencil(e);break; }
		          	case 4	:	{   fakeLineInput(e);	break;	   }
		          	case 5	:	{   fakeRectangleInput(e);break;    }
		          	case 6	:	{   fakeWordsInput(e);break;    }
		          	case 7  :   {   fakeRectangleInput(e);break;}
	          	}
	      	}
		      
		      
	      	/**
	       	 * 使用文字工具时，
	         * 当鼠标被按下时，可以在画布上拖动一行
	         */
	      	function fakeWordsInput(e){
	    	  	var offset = $("#myCanvas").offset();
	          	endX = e.pageX-offset.left;
	          	endY = e.pageY-offset.top;
	          	if(flag){
	               	fontTip.show();
	               	fontTip.css({left:x,top:y});
	               	fontTip.width(endX-x);
	               	fontTip.height(endY-y);
	            }
	      	}
		      
		      
			function fakeRectangleInput(e){
	   			var offset = $("#myCanvas").offset();
			    endX = e.pageX-offset.left;
			    endY = e.pageY-offset.top;
    
    			var borderWidth  = 1; 
			    if(flag){	
			       	rectTip.css({left:x-Math.abs(endX-x),top:y});
			       	if ((endX-x)<0 && (endY-y) < 0) {
						rectTip.css({left:x-Math.abs(endX-x),top:y-Math.abs(endY-y)});
			       	} else if ((endX-x)<0) {
			       		rectTip.css({left:x-Math.abs(endX-x),top:y});
			       	}else if ((endY-y) < 0) {
			       		rectTip.css({left:x,top:y-Math.abs(endY-y)});
			       	}else{
			       		rectTip.css({left:x,top:y});
			       	}
			       	rectTip.width(Math.abs(endX-x) -borderWidth);
			       	rectTip.height(Math.abs(endY-y) -borderWidth);
			       	console.log(flag);
			    }
			}
		      
		      
	      	/**
	      	 * 画线   
	      	 */
	      	function fakeLineInput(e){
	      	    var offset = $("#myCanvas").offset();
	            endX= e.pageX-offset.left;
	            endY  = e.pageY-offset.top;
	     		if(flag){
				   lineTip.adjustLine({
						beginX:x,
						beginY:y,
						endX:endX,
						endY:endY,
						parent:$("#myCanvas")
				   })
		        }
	      	}
		      
		      
	      	//在画布上画不规则的线
	      	function drawPencil(e){
		      		   
	            //按下鼠标时
	             var offset = $("#myCanvas").offset();
            	 var x = e.pageX-offset.left;
            	 var y = e.pageY-offset.top;
            	 ctx.strokeStyle = "#"+$("#colorpicker-popup").val();
	            if(flag){	
			      	 $("#show").html(x + ", " + y+"  "+e.which);
					 ctx.lineTo(x,y);
					 ctx.stroke();  
	            }else{	
					ctx.beginPath();
				    ctx.moveTo(x,y);
				}
					
	      	}
		      
		      
		      
	      	/**
	      	 * 清空画布上的内容
	      	 */
	      	function clearCanvas(){
	      		ctx.fillStyle="#FFFFFF";
				var width  = $("#myCanvas").attr("width");
				var height  = $("#myCanvas").attr("height");
				ctx.fillRect(0,0,width,height);	
	      	}
		      
		      
	      	$("#container").mousedown(function(e){
	            flag=true;
	            var offset = $("#myCanvas").offset();
	            x = e.pageX-offset.left;
				y = e.pageY-offset.top;

				console.log("begin:"+x+" "+y);

				switch(command)	{
				 	case 1	:	{	break; }
		          	case 2	:	{	break; }
		          	case 4	:	{   lineTip.show(); break; }
		          	case 5	:	{
		      					   var borderColor = "#"+ $("#colorpicker-popup").val();
		      					   var borderWidth  = "1px"; 
		      					   var sr = borderColor +" "+borderWidth+ " solid";
		      					   var backgroundColor ="#"+$("#colorpicker-popup2").val();
		      					   rectTip.css({
		      						   "border": sr,
		      						   //"background-color":backgroundColor
		      					   });
		          					rectTip.show();
		          					break;    
		          				}
		          	case 6	:	{   break;    }

				}
	      	});
		      
	      	$("#container").mouseup(function(e){
		      
	            flag=false;
		            
	            // 用于撤销或重做的记录操作历史
	            historyPush();	
				
				switch(command){
				 	case 1	:	{	break; }
		          	case 2	:	{	break; }
		          	case 4	:  	{   drawline();break;}
		          	case 5	:	{   drawRectangle();break;}
		          	case 6	:	{   fontTip.focus();break;}
		          	case 7  :   {   drawCircle();break;}
				}
	      	});
              
		      
	      	fontTip.blur(drawWords);

	      	/**
	      	 *	撤销和重做调用
	      	 */
	     	$("#tools_undo").click(undo);
		    $("#tools_redo").click(redo);
		      

		      /**
		       * 画线的方法
		       */
	      	function drawline(){
          		ctx.beginPath();
			    var offset = $("#myCanvas").offset();
			    ctx.moveTo(x,y);
			    ctx.lineTo(endX,endY);
			    ctx.stroke();
			    lineTip.hide();
	      	}
		      
		      
		      /**
		       * 画矩形的方法e
		       */
	      	function drawRectangle(){
	 			var borderWidth  = 1; 
	 			ctx.strokeStyle = "#"+$("#colorpicker-popup").val();
	 			ctx.beginPath();
	 			console.log(x+"----"+y)
		        ctx.strokeRect(x-1,y-1,endX-x,endY-y);
			    rectTip.hide();
	      	}
		      
	      	/**
	      	 * 画圆形的方法（贝塞尔曲线）
	       	 */

	      	function drawCircle(context){

			   	var k = ((end.x-origin.x)/0.75)/2,
			      	w = (end.x-origin.x)/2,
			     	h = (end.y-origin.y)/2,
			     	x=(end.x+origin.x)/2,
			     	y=(end.y+origin.y)/2;
			   		if(context){
			   			context.strokeStyle = "#"+$("#colorpicker-popup").val();
			   			context.beginPath();
						context.moveTo(x, y-h);
						context.bezierCurveTo(x+k, y-h, x+k, y+h, x, y+h);
						context.bezierCurveTo(x-k, y+h, x-k, y-h, x, y-h);
						context.closePath();
						context.stroke();
			   		}
					
	      	}
		      /**
		       * 输入文字的方法
		       */
	      	function drawWords(e){
	    	  	var words = fontTip.val().trim();
				if(	fontTip.css("display")!= "none" && words ){
					ctx.strokeStyle ="#"+ $("#colorpicker-popup").val();
					ctx.fillStyle ="#"+$("#colorpicker-popup2").val();
    			    var offset = $("#myCanvas").offset();
    			    var offset2 = fontTip.offset();
    			    var fontSize = 14;
    			    ctx.font="14px 宋体";
    			    ctx.fillText(words,offset2.left-offset.left,(offset2.top-offset.top+fontSize*1));
    			    
		    	  	fontTip.val(""); 
				}
				fontTip.hide();
	      	}
		      
    	  	/**
    	   	 * 撤销 
    	   	 */
    	  	function undo(){
		  		if (cStep >= 0){
    				clearCanvas();
    			  	cStep--;
    			  	var tempImage = new Image();
    			  	tempImage.src = history[cStep];
    			  	tempImage.onload = function () { ctx.drawImage(tempImage, 0, 0);};
    		  	}
    	  	}
	    	  
             
    	 	/**
    	   	 * 重做
    	     */
		  	function redo(){
    		  	if (cStep <history.length-1) {
	    			clearCanvas();
	    			cStep++;
	    			var tempImage = new Image();
	    			tempImage.src = history[cStep];
	    			tempImage.onload = function () { ctx.drawImage(tempImage, 0, 0); };
	    		}
			}
			  
			  
		  	// 定义方法
		  	function initUI(w,h){
	      		//界面UI初始化，对话框
		        $( "#dialog" ).dialog({
					autoOpen: true,
					show: {
						effect: "blind",
						duration: 920
					},
					hide: {
						effect: "explode",
						duration: 920
					},
					height:650,
					width:990
					
					// 有图片时，根据图片调整画布大小
					// height:h+180,
					// width:w+30
				});
				
		       
				  //2. canvas 被拖动，重新设置画板大小（因为拖动是css效果，而实际画板大小是width 和height属性）				
//		      	$("#myCanvas").resizable({
//			      	stop:function(event,ui){
//			            var height =  $("#myCanvas").height();
//			            var width =$("#myCanvas").width();
//			            $("#myCanvas").attr("width",width);
//			            $("#myCanvas").attr("height",height);
//			            //画板大小改变，画笔也会被初始化，这里将画笔复原
//			            switchCanvasContext();
//			      	},
//		      		grid: [ 20, 10 ]
//		      	});
			      
		      	//3. 工具条
		      	$("#tools_pencil").button({
		        	icons:{
		           	primary:"ui-icon-pencil"
		        	}
		      	});

		      	$("#tools_eraser").button({
		        	icons:{
		           		primary:"ui-icon-bullet"
		        	}
		      	});
		      	$("#tools_trash").button({
		        	icons:{
		           		primary:"ui-icon-trash"
		        	}
		      	});
			      
		      	$("#tools_save").button({
		    	  	icons:{
		    			primary:"ui-icon-disk"
		    	  	}
		     	});
			      
			      
		       	$("#tools_undo").button({
			        icons:{
			           primary:"ui-icon-arrowreturnthick-1-w"
			        }
		      	});
			      
		       	$("#tools_redo").button({
			        icons:{
			           primary:"ui-icon-arrowreturnthick-1-e"
			        }
		      	});
		       	$("#tools_line").button({
			        icons:{
			           primary:"ui-icon-minusthick"
			        }
		      	});
		        $("#tools_rectangle").button({
			        icons:{
			           primary:"ui-icon-stop"
			        }
		      	});
		        $("#tools_rotundity").button({
			        icons:{
			           primary:"ui-icon-key"
			        }
		      	});
		        $("#tools_circle").button({
		            icons:{
	            		primary:"ui-icon-radio-off"
		            }
		        });
		        $("#boldOption").button();
		        $("#italicOption").button();
			      
		      	//4. 画笔粗细设置	
		      	// $("#penWidth").selectmenu({
		      	//     width:70,
		      	//     select:penWidthEventListener
		      	// });
			      
		      	function penWidthEventListener(event,ui){
			    	  
		    	  	//1. update brash width
		    	  	var lineWidth = ui.item.value;
	              	ctx.lineWidth =lineWidth;
		              
              		//2. update LineTip Width
	              	lineTip.css("border-top-width",lineWidth+"px");
		              
              		//3.update RectTip width
	              	rectTip.css("border-width",lineWidth+"px");
	              	return false;
		      	}
			      
			      
			      
		      	$("#fontSize").selectmenu({
		    	  	width:100,
		    	  	select:function(event,ui){
		    		  	setFont();
		    	  	}
		      	});
			      
			      
			      
		      	$("#fontType").selectmenu({
		    	  	width:100,
		    	  	select:function(event,ui){
		    		  	setFont();
		    		  	return false;
		    	  	}
		      	});
				
		      	setFont();
			      
			  	//5. 颜色选择器
			  	$("#colorpicker-popup").colorpicker({
			     	buttonColorize: true,
			     	alpha:          true,
		     		draggable:       true,
			        showOn:         'both',
				   	close:borderColorEventListener
			  	});
			  	 borderColorEventListener(document.getElementById("colorpicker-popup"))
			  	function borderColorEventListener(e){
				  	// 1. 设置文字
			  		var color = e.value || e.target.value;
				  	//var color= "#"+$(this).val();
			   	  	ctx.strokeStyle =color;
					  
				  	// 2. 设置边框颜色
			   	  	lineTip.css({"border-color":color});
			   	  	rectTip.css({"border-color":color});
			   	  	//fontTip.css({"border-color":color});
			  	}
				  
				  
			  	//5. 初始化颜色选择器
			  	$("#colorpicker-popup2").colorpicker({
				     buttonColorize: true,
				     alpha:          true,
				     draggable:       true,
			         showOn:         'both',
			         close:fillColorEventListener
			  	});
				  
			  	function fillColorEventListener(e){
				  	var color= "#"+$(this).val();
			   	   	ctx.fillStyle =color;
			   	   	rectTip.css({"background-color":color});
			   	   	fontTip.css({"color":color});
			  	}
				  
	      	}
			  
		  	$("#italicOption").click(setFont);
		  	$("#boldOption").click(setFont);
			  
			  // 设置字体
	      	function setFont(){
	    	  	// var size = $("#fontSize").val();
	    	  	// var type = $("#fontType").val();
	    	  	// var color = "#" +$("#colorpicker-popup2").val();
		    	  
	    	  	// var fontWeight = $("#boldOption").get(0).checked;
	    	  	// fontWeight = fontWeight ? "bold" : " ";
		    	  
	    	  	// var fontItalic =$("#italicOption").get(0).checked;
	    	  	// fontItalic = fontItalic ? " italic " : " ";
	    	  	// ctx.font = fontItalic+ fontWeight+" " +size+" "+type;
	    	  	// fontTip.css({"font-size":size,"font-family":type,color:color,"font-style":fontItalic,"font-weight":fontWeight});
	      	}
			  
		  	$("#tools_save").click(saveItAsImage);
			  
		  	/**
		   	 * 将画布保存成图片
		     */
		  	function saveItAsImage(){
			  	var image = $("#myCanvas").get(0).toDataURL();
			  	//保存到本地
			  	window.location.href=image; 
		  	}
			  
			  

	      	/**
	       	 * 记录当前画布（相当于缓存）
	       	 */
	      	function historyPush(){
	          	cStep++;
			  	if (cStep < history.length) { 
					history.length = cStep; 
			  	}

		    	history.push($("#myCanvas").get(0).toDataURL());
	      	}
		      
		      
		  	/**
		   	 * 为不同状态切换画布
   	 	 	 */
	      	function switchCanvasContext(command){
	          	ctx.lineWidth = 1;
		   	  	ctx.strokeStyle ="#"+ $("#colorpicker-popup").val();
		   	  	ctx.lineCap = "round";
		   	  	ctx.fillStyle ="#"+$("#colorpicker-popup2").val();
			   	  
	          	if(command){
		          	switch(command){
	            	 	case 1: {
				          	break;
		             	}
		             	case 2: {
		                  	ctx.strokeStyle ="#FFFFFF";
			      	 	   	ctx.lineWidth = 15;
				          	break;
		             	}
		             	case 3:{
		            	 	clearCanvas();
		            	 	$("#tools_pencil").trigger("click");
				         	$("#tools_pencil").focus();
		             	}
		         	}
	          	}
		   	  	return ctx;
	      	}
		      

		      
		      /**
		      *  为不同的命令切换鼠标样式图标
		      */
		    function switchCursorStyle(command){
		        switch(command){
		           	case 1: {
			          	$("#myCanvas1").removeClass("container_eraser");
			          	$("#myCanvas1").removeClass("container_font");
			          	$("#myCanvas1").addClass("container_pencil");
			          	break;
	             	}
		             case 2: {
		            	$("#myCanvas1").removeClass("container_pencil");
		          		$("#myCanvas1").removeClass("container_font");
			          	$("#myCanvas1").addClass("container_eraser");
			          	break;
		             }
		             case 6: {
	            	 	$("#myCanvas1").removeClass("container_eraser");
	            	 	$("#myCanvas1").removeClass("container_pencil"); 
	            	 	$("#myCanvas1").addClass("container_font");
			          	break;
		             }
		            default:{
			          	$("#myCanvas1").removeClass("container_eraser");
			          	$("#myCanvas1").removeClass("container_font");
			          	$("#myCanvas1").addClass("container_pencil");
			          	break;
		            }
		        }
		        
		    }
       	})(); 


console.log("")  
console.log("                                  _oo8oo_")
console.log("                                 o8888888o")
console.log('                                 88" . "88')
console.log("                                 (| -_- |)")
console.log("                                 0\\  =  /0")
console.log("                               ___/'==='\\___")
console.log("                             .' \\"+"\\\|     |// '.")
console.log("                            / \\"+"\\|||  :  |||// \\")
console.log("                           / _||||| -:- |||||_ \\")
console.log("                          |   | \\"+"\\"+"\\  -  /// |   |")
console.log("                          | \\_|  ''\\---/''  |_/ |")
console.log("                          \\  .-\\__  '-'  __/-.  /")
console.log("                        ___'. .'  /--.--\\  '. .'___")
console.log('                    (.""'+" '<  '.___\\_<|>_/___.'  >'"+' "".)')
console.log("                    | | :  `- \\`.:`\\ _ /`:.`/ -`  : | |")
console.log("                    \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /")
console.log("                =====`-.____`.___ \\_____/ ___.`____.-`=====")
console.log("                                  `=---=`")
console.log("  ")
console.log(" ")
console.log("       		  ~~~~~~~Created by duys on 2017/6/21.~~~~~~~")
console.log("")
console.log("                          佛祖保佑         永无bug")

    });


