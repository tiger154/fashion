var imgWidth=0;
var imgCount=0;
var thisImage=1;
var $slide;
//var autoSlide;

$(function(){
	$slide = $(".slideContainer .slideShow");
	imgWidth = $(".slideContainer").width();
	imgCount = $slide.children("ul").length;

	//autoSlide = setTimeout("rightMove(1)",3000);
});

function moveImage(num) {
	var move = thisImage - num;

	// ���� �̹��� ��ȣ���� ���� ��ȣ�� Ŭ������ �� ��������
	if(thisImage>num) {
		leftMove(thisImage - num);
	
	// ���� �̹������� ū ��ȣ�� Ŭ������ �� ����������
	} else if(thisImage<num) {
		rightMove(num - thisImage);
	}
}

// ��������
function leftMove(num) {
	//clearInterval(autoSlide);
	
	// ���� ���̴� �̹�����ȣ�� 1���� Ŭ���� ������
	if(thisImage>1) {
		thisImage-=num;
		//$slide.animate({"left":"+="+imgWidth*num},500);
		$slide.animate({"left":"+="+125*num},500);
	}

	//autoSlide = setTimeout("rightMove(1)",3000);
}

// ����������
function rightMove(num) {
	//clearTimeout(autoSlide);
	//alert(num);
	//alert(imgWidth);
	//wid = 160;
	// ���� �̹�����ȣ�� �̹��� �������� ���� �� ������
	if(thisImage<imgCount) {
		thisImage+=num;
		//$slide.animate({"left":"-="+imgWidth*num},500);
		$slide.animate({"left":"-="+125*num},500);
	// ���� �̹��� ��ȣ�� �̹��� ������ �Ѱ��� �� ó������(1�� �̹���)..
	} else {
		showImage(1);
		moveImage(1);
		return;
	}
	//autoSlide = setTimeout("rightMove(1)",3000);
}


function showImage(num) {
	$slide.children().eq(num-1).animate({"opacity":"1"},600);
}

function hideImage(num) {
	$slide.children().eq(num-1).animate({"opacity":"0"},300);
}