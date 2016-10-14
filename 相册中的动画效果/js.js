$(function() {
	var curIndex=-1;//初始化当前打开图片值
	var intImgL="-120px";
	var intImgT="-120px";
	//带参数index遍历图片外框Div
	$(".p_Lst").each(function(index) {
		var $this=$(this);//获取每个外框的Div
		var $img=$this.find("img");//查找其中的图片元素
		var $info=$this.find(".p_Alt");//查找其中的图片信息元素
		var arrPic={};//定义一个空数组保存初始的长与宽
		arrPic.imgw=$img.width();
		arrPic.imgh=$img.height();
		arrPic.orgw=$this.width();
		arrPic.orgh=$this.height();
		$img.css({//设置初始时图片外边距位置
			marginLeft: intImgL,
			marginTop: intImgT
		});
		//将图片、点击放大链接、关闭按钮放入外框Div中
		var $drag=$("<div class='p_Img'>").append($img).prependTo($this);
		var $open=$("<a href='javascript:void(0)' class='p_Big' title='点击放大'></a>").appendTo($this);
		var $clos=$("<a href='javascript:void(0)' class='p_Cls' title='点击关闭'></a>").appendTo($info);
		//保存放入元素后的外框Div的长与宽
		arrPic.dragw=$drag.width();
		arrPic.dragh=$drag.height();

		//放大按钮单击事件
		$open.click(function() {
			$this.animate({//外框动画
                width: arrPic.imgw,
                height: (arrPic.imgh),//85是图片信息的高度
                borderWidth: "5"
			},3000);
			$open.fadeOut();//点击当大链接淡出
			$(".p_Alt",$this).fadeIn();//图片信息淡入
			$drag.animate({//加入图片后的Div框动画
                width: arrPic.imgw,
                height: arrpic.imgh
			},3000);
			$img.animate({//以动画形式自动调整位置
                marginTop: "0px",
                marginLeft: "0px"
			},3000);
			//获取当前被放大成原始图的图片各组成部分
			var $f_this=$(".p_Lst:eq("+curIndex+")");
			var $f_open=$(".p_Big:eq("+curIndex+")");
			var $f_drag=$(".p_Img:eq("+curIndex+")");
			var $f_larg=$(".p_Alt:eq("+curIndex+")");
			var $f_imgs=$("img:eq("+curIndex+")");
			if (curIndex!=-1) {//如果当前已经有放大的图片
                //自动以动画形式关闭该窗口
                cls_Click($f_this,$f_open,$f_drag,$f_imgs,$f_larg);
			}
			//重新获取当前放大图片的索引号
			curIndex=index;
		});

		//关闭按钮单击事件
		$clos.click(function() {
			//以动画的形式缩小当前点击的图片
			cls_Click($this,$open,$drag,$img,1);
			//初始化索引号
			curIndex=-1;
		});
		/*pF表示图片最外层Div
		pO表示图片点击前的放大按钮
		pW表示紧邻图片层Div
		pI表示紧选中的元素
		blnS表示图片的说明内容*/
		function cls_Click(pF,pO,pW,pI,blnS) {
			var $strInit;
			pF.animate({
				width: arrPic.orgw,
				height: arrPic.orgh,
				borderWidth: "1"
			},3000);
			pO.fadeIn();
			if (blnS) {
				$strInit=$(".p_Alt",pF);
			}else {
				$strInit=blnS;
			}
			$strInit.fadeOut();
			pW.animate({
				width: arrPic.dragw,
				height: arrPic.dragh
			},3000);
			pI.animate({
				marginTop: intImgT,
				marginLeft: intImgL
			},3000);
		}
	})
})