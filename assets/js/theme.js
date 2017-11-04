//var strCalendar = "";
function dmC(t){
	var str=t.innerHTML;
	t.parentNode.parentNode.parentNode.getElementsByClassName('form-control')[0].innerHTML=str;
}
function createCalendar(whichDiv,y,m)
{


date.setFullYear(y);
date.setMonth(m);

  var strCalendar = "";
  
  // 每月日數陣列
  var monthDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
  
  // 閏年判斷
  mYear = date.getFullYear();
  if ( ( (mYear % 4 == 0) && (mYear % 100 != 0) ) || (mYear % 400 == 0) ) monthDays[1] = 29;
  
  // 設定日期為該月第一天
  date.setDate(1);
  
  // 該月第一天的星期
  var day = date.getDay();
  
  // 計算秀出時需要的格數
  var total = monthDays[date.getMonth()] + day;
  var totalCells = total + ( total%7 ? 7 - total%7 : 0  ); 
 

  strCalendar ='<TABLE >';
  strCalendar += '<TR>';
  strCalendar += '<TH></TH>';
  strCalendar += "<TH>日</TH>";
  strCalendar += '<TH>一</TH>';
  strCalendar += '<TH>二</TH>';
  strCalendar += '<TH>三</TH>';
  strCalendar += '<TH>四</TH>';
  strCalendar += '<TH>五</TH>';
  strCalendar += '<TH>六</TH>';
  strCalendar += '</TR>';

	
  for (i=0;i<totalCells;i++)
  {
	if ( i%7 == 0 )
		strCalendar+="<TR><TD>&nbsp;</TD>";


	if ( i >= day && i < total )
	{
		if ( i >= day )
		{
			var myY = date.getFullYear();
			var myM = date.getMonth()+1;
			var myD = (i-day)+1;
			if((i-day)+1<10)
				{ strCalendar = strCalendar + "<TD><SPAN onclick=\"setmydate(this," + myY + "," + myM + "," + myD + ");\" >0"+myD;
				
				}
			else strCalendar = strCalendar + "<TD><SPAN onclick=\"setmydate(this," + myY + "," + myM + "," + myD + ");\" >"+myD;
			
		}
	}
	else
	{
		strCalendar += "<TD>&nbsp;";
	}


	strCalendar += "</SPAN></TD>";


	if ( i%7 == 6 )
		strCalendar += "</TR>";
   }
   
	
  whichDiv.innerHTML = strCalendar;
}
function setup(t,type){
	event.stopPropagation();
	var cal=t.parentNode.parentNode.getElementsByClassName('dateTable')[0];
	var YYYY=t.parentNode.parentNode.getElementsByClassName('YYYY')[0];
	var YYYY2=t.parentNode.parentNode.getElementsByClassName('YYYY')[1];
	var MM=t.parentNode.parentNode.getElementsByClassName('MM')[0];
	var MMbtn=t.parentNode.parentNode.getElementsByClassName('monthTable')[0].getElementsByTagName('TD');
	
	var ystr=YYYY.innerHTML;
	var yint=parseInt(ystr);
	var mstr=MM.innerHTML;
	var mint=parseInt(mstr);
	if(type=='m'||type=='M'){
		MMbtn[mint-1].className='dminner';
		mint++;
		if(mint >= 13){
			mint=1;
			yint++;
			YYYY.innerHTML=yint;
			YYYY2.innerHTML=yint;
		}
		MM.innerHTML=mint;
		
		MMbtn[mint-1].className='dminner on';
	}
	else{
		yint++;
		YYYY.innerHTML=yint;
		YYYY2.innerHTML=yint;	
	}
	createCalendar(cal,yint,mint-1);
	
}
function setdown(t,type){
	event.stopPropagation();
	var cal=t.parentNode.parentNode.getElementsByClassName('dateTable')[0];
	var YYYY=t.parentNode.parentNode.getElementsByClassName('YYYY')[0];
	var YYYY2=t.parentNode.parentNode.getElementsByClassName('YYYY')[1];
	var MM=t.parentNode.parentNode.getElementsByClassName('MM')[0];
	var MMbtn=t.parentNode.parentNode.getElementsByClassName('monthTable')[0].getElementsByTagName('TD');
	
	var ystr=YYYY.innerHTML;
	var yint=parseInt(ystr);
	var mstr=MM.innerHTML;
	var mint=parseInt(mstr);
	if(type=='m'||type=='M'){
		MMbtn[mint-1].className='dminner';
		mint--;
		if(mint <= 0){
			mint=12;
			yint--;
			YYYY.innerHTML=yint;
			YYYY2.innerHTML=yint;			
		}
		MM.innerHTML=mint;
		
		MMbtn[mint-1].className='dminner on';
	}
	else{
		yint--;
		YYYY.innerHTML=yint;
		YYYY2.innerHTML=yint;	
	}
	
	
	
	createCalendar(cal,yint,mint-1);
}
function selectMonth(t,m){
	event.stopPropagation();
	var father=t.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	var cal=father.getElementsByClassName('dateTable')[0];
	var MM=father.getElementsByClassName('MM')[0];
	var YYYY2=father.getElementsByClassName('YYYY')[1];
	
	var ystr=YYYY2.innerHTML;
	var yint=parseInt(ystr);
	t.parentNode.parentNode.getElementsByClassName('on')[0].className='dminner';
	t.className='dminner on';
	MM.innerHTML=m;
	
	createCalendar(cal,yint,m-1);
	father.className='dropdown-menu mycalendar';
	
}

function setmydate(t,y,m,d){
	 
	t.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('form-control')[0].innerHTML=y+'/'+m+'/'+d;
			
}

function changeYear(effectiveDate){
	event.stopPropagation();
	document.getElementById(effectiveDate).className='dropdown-menu mycalendar month'
}

function changeMenu(effectiveDate) {
	event.stopPropagation();
	document.getElementById(effectiveDate).className='dropdown-menu mycalendar'
}

var date = new Date();
var newM=date.getMonth();
var newY=date.getFullYear();

$('document').ready(function(){
	if(document.getElementsByClassName('MM')[0] && document.getElementsByClassName('YYYY')[0] && document.getElementsByClassName('YYYY')[1]) {
		document.getElementsByClassName('MM')[0].innerHTML=newM+1;
		document.getElementsByClassName('YYYY')[0].innerHTML=newY;
		document.getElementsByClassName('YYYY')[1].innerHTML=newY;
		var dateT=document.getElementsByClassName('dateTable')[0];
		createCalendar(dateT,newY,newM);
		document.getElementsByClassName('monthTable')[0].getElementsByTagName('TD')[newM].className='dminner on';
	}
	 
});













