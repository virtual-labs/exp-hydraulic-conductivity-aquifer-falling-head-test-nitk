//Variables declaration
let myInt; let calcTrack=0;
let myInt1;
let simsubscreennum=0, temp=0;
const mouldDia=7.8, mouldHeight=6.1, constHead=67.5;


const nextButton=document.querySelector(".nextButton");
// const pointerArrow=document.querySelector(".arrow");
const tooltip=document.querySelector(".tooltip");
const variables=document.querySelector('.variables');
const varDescription=document.querySelector('.variables-description');
let interval=1000;
let increment=0;
const dataset=[["T1",100,90,	24],
			   ["T1",90,	80,	27, ],
			   [ "T1",80,	70,	30,],
			   ["T2",100,	85,	37, ],
			   ["T2",85,	70,	44, ],
			   ["T2",70,	55,	55, ],
			   ["T3",100,	80,	51, ],
			   ["T3",80,	60,	66, ],
			   [ "T3",60,	40,	94,]];
			   
			   const dataset1=[[100,90,12
					,"T1"],
			   [90,	80,	13
				, "T1"],
			   [80,	70,15
				, "T1"],
			   [100,	85,	18
				, "T2"],
			   [85,	70,	21
				, "T2"],
			   [70,	55,	26
				, "T2"],
			   [100,	80,24
				, "T3"],
			   [80,	60,	32
				, "T3"],
			   [60,	40,	45, "T3"]];
//Calculation

function myStopFunction1() {
	// console.log("arrow2");
	clearInterval(myInt1);
	document.getElementById("arrow2").style.visibility = "hidden";
  }




  function animatearrow1() {
	if (document.getElementById('arrow2').style.visibility=="hidden")
	document.getElementById('arrow2').style.visibility="visible";
else
	document.getElementById('arrow2').style.visibility="hidden";
  }











function hideNextButton(){
	nextButton.classList.add('hidden');
	// document.querySelector(".nextButton").style.visibility="hidden";
}

function displayNextButton()
{
	// nextButton.classList.remove('hidden');
	document.querySelector(".nextButton").style.visibility="visible";
}

const mouldArea=Math.PI*(Math.pow(mouldDia, 2))/4*10;
const mouldVolume=mouldArea*mouldHeight;
let totalOfQ=0, avgOfQ=0;//Average of volume of water collected in measuring jar
for(i=0;i<dataset.length;i++)
	totalOfQ+=dataset[i][1];
avgOfQ=totalOfQ/dataset.length;

const coefficient=(avgOfQ*mouldHeight)/(mouldArea*dataset[0][0]*constHead)*1000;

// Formative questions
var questions=["The filter paper is placed inside the permeameter so that soil particles do not clog the pores present in the porous stones.",
			   "The number of blows to be given for each soil layer is _____.",
			   "What is the diameter of the stand pipe?"];
			   
var options2=[["True","False"],//True
			  ["6","7","5","3"],//5
			  ["1cm","2cm"]];//67.5cm

// font-size:14px; background-color:grey; color:white; padding:7.5px; border-radius:5px; :::: formativeQuestDiv
function validateFormativeQA(qn,ans,left,top)
{
	$(".answer").empty();
	document.querySelector(".a").innerHTML="";
	document.querySelector(".formativeQuestDiv").style="position:absolute; left:"+left+";top:"+top+"; visibility:visible;";
	document.querySelector(".q").innerHTML=questions[qn];
	el = document.createElement("option");
	el.textContent = " ";
	el.value = " ";
	document.querySelector(".answer").appendChild(el);
  
	for(j=0;j<options2[qn].length;j++)
	{
		opt = options2[qn][j];
		el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		document.querySelector(".answer").appendChild(el);
		$(".answer").change(function()
		{
			ca=$(this).children("option:selected").val();
			if(options2[qn][ans]==ca)
			{
				document.querySelector(".a").innerHTML="Correct Answer!";
			}
			else
			{
				document.querySelector(".a").innerHTML="Wrong! Answer is "+options2[qn][ans];
			}
			setTimeout(function()
			{
				document.querySelector(".formativeQuestDiv").style.visibility="hidden";
				document.querySelector(".nextButton").style.visibility="visible";
			},1500);
		});
	}
}

function create_totalTable(className, time) 
{
	let j=0;
    let table = document.querySelector(className);
    for(let i=dataset.length-1;i>=0;i--)
    {
		$(className).delay(time)
		.queue(function (create_totalTable) 
		{
			$(this).append("<tr><td style=\"border:1px solid black; padding:5px;\">" + (+j+1)  + "</td><td style=\"border:1px solid black; padding:5px;\">"+ dataset1[j][0] +"</td><td style=\"border:1px solid black; padding:5px;\">"+ dataset1[j][1]  +"</td></tr>");
			
			j++;
			// time=dataset[j][0]*60*1000;
			create_totalTable(time);
        });
	}
}
function create_totalTable(className, time) {
    let j = 0;
    let table = document.querySelector(className);
    for (let i = dataset1.length - 1; i >= 0; i--) {
        $(className).delay(time)
            .queue(function (create_totalTable) {
                // Calculate mouldVolume, totalOfQ, and coefficient
                const mouldArea = Math.PI * (dataset1[j][0] / 4) * 10;
                const mouldVolume = mouldArea * dataset1[j][1];
                let totalOfQ = 0, avgOfQ = 0;

                for (let k = 0; k <= j; k++) {
                    totalOfQ += dataset1[k][1];
                }
                avgOfQ = totalOfQ / (j + 1);

                const coefficient = (avgOfQ * dataset1[j][2]) / (mouldArea * dataset1[0][0] * constHead) * 1000;

                // Append row with three columns
                $(this).append("<tr><td style=\"border:1px solid black; padding:5px;\">" +dataset1[j][3] + "</td><td style=\"border:1px solid black; padding:5px;\">" + dataset1[j][0] + "</td><td style=\"border:1px solid black; padding:5px;\">" + dataset1[j][1] +  "</td><td style=\"border:1px solid black; padding:5px;\">" + dataset1[j][2] + "</td></tr>");

                j++;
                // time=dataset[j][0]*60*1000;
                create_totalTable(time);
            });
    }
}


function commonStmtsInEvaluateCalculationAnswers(inputBoxClass, checkBtnClass, resultBtnClass, RgtWrngMarkClass)
{	
	document.querySelector(RgtWrngMarkClass).classList.remove("wrong-mark");
	document.querySelector(inputBoxClass).disabled=true;
	document.querySelector(inputBoxClass).style.color="black";
	document.querySelector(resultBtnClass).classList.add("hidden");
	document.querySelector(checkBtnClass).classList.add("hidden");
	if(simsubscreennum===1){
		if(calcTrack===1)
		{
			document.querySelector('.vol-table').style.visibility="visible";
			calcTrack=0;	
			evaluateCalculationAnswers('.vol', mouldVolume,'.check2', '.result2', '.mark2');
		}
		else if(calcTrack===0) displayNextButton();
	}
	// if(simsubscreennum==12)
	// {
	// 	if(calcTrack===1)
	// 	{
	// 		document.querySelector('.coefficient-tab').style.visibility="visible";	
	// 		evaluateCalculationAnswers('.coeff', coefficient,'.check4', '.result4', '.mark4');
	// 	}
	// 	else if(calcTrack===2){
	// 		document.querySelector('.inference').style.visibility="visible";
	// 	}
	// }
}

function evaluateCalculationAnswers(inputBoxClass,rightAnswer,checkBtnClass,resultBtnClass,RgtWrngMarkClass)
{
	document.querySelector(resultBtnClass).disabled=true;
	document.querySelector(checkBtnClass).addEventListener("click",function(){
		
		if(document.querySelector(inputBoxClass).value && document.querySelector(inputBoxClass).value!==null && document.querySelector(inputBoxClass).value!=="" && document.querySelector(inputBoxClass).value!==" ")
		{
			if(+(document.querySelector(inputBoxClass).value) == rightAnswer.toFixed(2))
			{
				document.querySelector(RgtWrngMarkClass).classList.remove("hidden");
				document.querySelector(RgtWrngMarkClass).innerHTML="&#10004;";
				document.querySelector(RgtWrngMarkClass).classList.add("right-mark");
				commonStmtsInEvaluateCalculationAnswers(inputBoxClass, checkBtnClass, resultBtnClass, RgtWrngMarkClass);
				if((simsubscreennum==2  && calcTrack===1) || (simsubscreennum==12  && calcTrack===1)) calcTrack=2;
			}
			else 
			{
				// document.querySelector(RgtWrngMarkClass).classList.remove("hidden");
				document.querySelector(RgtWrngMarkClass).innerHTML="&#10008;";
				document.querySelector(RgtWrngMarkClass).classList.add("wrong-mark");
				document.querySelector(RgtWrngMarkClass).classList.remove("right-mark");
				document.querySelector(resultBtnClass).disabled=false;
			}
		}
		else {
			alert("Enter appropriate value to proceed.");
		}
	});
	document.querySelector(resultBtnClass).addEventListener("click",function()
	{
		document.querySelector(inputBoxClass).value=rightAnswer.toFixed(2);
		document.querySelector(RgtWrngMarkClass).classList.add("hidden");
		commonStmtsInEvaluateCalculationAnswers(inputBoxClass, checkBtnClass, resultBtnClass, RgtWrngMarkClass);
		if((simsubscreennum==2 && calcTrack===1) || (simsubscreennum==12 && calcTrack===1)) calcTrack=2;
	});
}

function placePorousStoneOnTop(){
	//Placing porous stone
	document.querySelector(".setup5-10").style.visibility="visible";
	blinkArrow("175","425",270,30);
	document.querySelector(".setup5-10").addEventListener("click",function(){
		myStopFunction();
		document.querySelector(".setup5-10").style.visibility="hidden";
		document.querySelector(".setup5-11").style.visibility="visible";
		document.querySelector(".setup5-11").style.animation="placePorousStone 1.15s forwards";
		setTimeout(function(){
			document.querySelector(".setup5-11").style.visibility="hidden";
			document.querySelector(".setup5-10").style="position: absolute; left: 459px; top: 303px; visibility:visible; height:19px;";
			setTimeout(function(){
				displayNextButton();
			},300);
		},1150);
	});
}

function placeFilterPaper(className1,className2)
{
	document.querySelector(className1).style.visibility="visible";
	blinkArrow("185","460",270,30);
	document.querySelector(className1).addEventListener("click",function()
	{
		myStopFunction();
		document.querySelector(className2).style.visibility="visible";
		document.querySelector(className2).style.animation="placeFilterPaper 1.25s forwards";
		setTimeout(function()
		{
			document.querySelector(className2).style.visibility="hidden";					
			document.querySelector(className1).style.visibility="hidden";				
			if(simsubscreennum===3)	displayNextButton();
			if(simsubscreennum===5) 
			{
				document.querySelector(".setup5-7").style.visibility="hidden";
				setTimeout(function(){
					placePorousStoneOnTop();
				},500);
			}
		},1350);
	});
}

function step8continued()
{
	document.querySelector(".setup8-9").style.visibility="visible";
	setTimeout(function(){
		document.querySelector(".setup8-8").style.visibility="visible";
		setTimeout(function()
		{
			// blinkArrow("342","331","180","30");
			document.getElementById('arrow1').style="visibility:visible; position:absolute; left:342px; top:331px; height:30px; z-index: 10; transform:rotate(180deg);";
			document.querySelector(".setup8-5b").onclick = function () {
				// myStopFunction();
				document.getElementById('arrow1').style.visibility="hidden";
				document.querySelector(".setup8-5b").style.animation="openValve 0.5s reverse";
				setTimeout(function(){
					document.querySelector(".setup8-7").style.visibility="hidden";
					document.querySelector(".setup8-8").style.visibility="hidden";
					document.querySelector(".setup8-9").style.visibility="hidden";
					// blinkArrow(468,371,270,20);
					document.getElementById('arrow1').style="visibility:visible; position:absolute; left:468px; top:371px; height:20px; z-index: 10; transform:rotate(270deg);";
					document.querySelector(".setup8-4").onclick = function () {
						// myStopFunction();
						document.getElementById('arrow1').style.visibility="hidden";
						document.querySelector(".setup8-4").style.visibility="hidden";
						// displayNextButton();
						document.querySelector(".nextButton").style.visibility="visible";
					};
				},500);
			};
		},500);
	},300);
}

function step9continued()
{
	// document.getElementById('arrow2').style.visibility="hidden";

	var selectedValue = document.querySelector('input[name="sampletype"]:checked').value;
	console.log("Hi praj");
	if(selectedValue === "1"){
		document.querySelector(".setup9-6 ").style.visibility="visible";
		setTimeout(function(){
			// blinkArrow("344","408","180","30");
		// myInt1 = setInterval(function () {
		// 	animatearrow1();
		//   }, 500);
		  document.getElementById("arrow2").style =
		  "visibility:visible ;position:absolute; left:344px; top:408px; height: 30px; z-index: 10;";
		document.getElementById("arrow2").style.WebkitTransform = "rotate(180deg)";
		document.getElementById("arrow2").style.msTransform = "rotate(180deg)";
		document.getElementById("arrow2").style.transform = "rotate(180deg)";

		document.querySelector(".setup9-51").onclick = function () {
		myStopFunction1();
		document.querySelector(".setup9-51").style.animation="openValve 0.5s forwards";
		setTimeout(function(){
			// document.querySelector(".setup9-41a").style.visibility="visible";
			document.querySelector(".setup9-42b").style.visibility="visible";
			
			setTimeout(function(){
				// displayNextButton();
				document.querySelector(".nextButton").style.visibility="visible";
			}, 500);
		}, 500);
	  };
    },500);
	}
	if(selectedValue === "2"){
		document.querySelector(".setup9-6 ").style.visibility="visible";
		// myInt = setInterval(function () {
		// 	animatearrow1();
		//   }, 500);
		
		
		  document.getElementById("arrow2").style =
		  "visibility:visible ;position:absolute; left:368px; top:408px; height: 30px; z-index: 10;";
		document.getElementById("arrow2").style.WebkitTransform = "rotate(180deg)";
		// Code for IE9
		document.getElementById("arrow2").style.msTransform = "rotate(180deg)";
		// Standard syntax
		document.getElementById("arrow2").style.transform = "rotate(180deg)";
	// blinkArrow(367,408,180,30);
	// document.getElementById('arrow1').style="visibility:visible; position:absolute; left:342px; top:319px; height:30px; z-index: 10; transform:rotate(180deg);";
	document.querySelector(".setup9-5").onclick = function () {
		myStopFunction1();
		document.querySelector(".setup9-4b").style.visibility="hidden";
		document.querySelector(".setup9-42").style.visibility="hidden";
		document.querySelector(".setup10-4").style.visibility="hidden";
				document.querySelector(".setup9-42b").style.visibility="hidden";
		// document.getElementById('arrow1').style.visibility="hidden";
		document.querySelector(".setup9-5").style.animation="openValve 0.5s forwards";
		setTimeout(function(){
			document.querySelector(".setup9-4b").style.visibility="visible";
			
			setTimeout(function(){
				// displayNextButton();
				document.querySelector(".nextButton").style.visibility="visible";
			},500);
		},500);
	};
	}
}

function displayNote(note="Fasten all the remaining bolts.",posLeft,posTop)
{
	setTimeout(function(){
		document.querySelector(".note").style="visibility:visible; position:absolute; left:"+posLeft+"px; top:"+posTop+"px;";
		document.querySelector(".note-text").innerHTML=note;
		document.querySelector(".note-btn").addEventListener("click",function(){
			document.querySelector(".note").style="visibility:hidden; "
			if(simsubscreennum===3)
			{
				document.querySelector(".setup3-11").style.visibility="visible";
				setTimeout(function()
				{
					placeFilterPaper(".setup3-12",".setup3-13");
				},500);
			}
			if(simsubscreennum===4)
			{
				displayNextButton();
			}
			if(simsubscreennum===6)
			{
				document.querySelector(".setup6-15").style.visibility="visible";
				document.querySelector(".setup6-16").style.visibility="visible";
				setTimeout(function()
				{
					// displayNextButton();
					validateFormativeQA(1,2,"100px","150px");
				},500);
			}
			if(simsubscreennum===7)
			{
				// blinkArrow("238","371","270","20");
				document.getElementById('arrow1').style="visibility:visible; position:absolute; left:238px; top:375px; height:20px; z-index: 10; transform:rotate(270deg);";
				document.querySelector(".setup7-6").addEventListener("click",function()
				{
					myStopFunction();
					document.querySelector(".setup7-6").style="height: 8px; position: absolute; left: 192px; top: 344px; width: 15px; background-color:#fff;";
					// displayNextButton();
					validateFormativeQA(0,0,"350px","150px");
				});
			}
			if(simsubscreennum==8)
			{
				step8continued();
			}
			if(simsubscreennum==10)
			{
				step9continued();
			}
		});
	},300);
}

function resetAnimation(){
	// myStopFunction1();
	// clearInterval(myInt1);
	document.querySelector(".setup4-11").style.animation="";
	document.querySelector(".setup4-12").style.animation="";
	document.querySelector(".setup4-13").style.animation="";

}
//others code


function pourSoilSampleAndTamp(cnt)
{
	document.querySelector(".setup4-11").style.visibility="visible";
	if(cnt===1) {blinkArrow("100","390",290,30);
      }
	if(cnt>=2) 
	
	// blinkArrow("100","390",290,30);
	document.getElementById('arrow1').style="visibility:visible; position:absolute; left:100px; top:390px; height:30px; z-index: 10; transform:rotate(290deg)";
	document.querySelector(".setup4-11").addEventListener("click",function(){
		myStopFunction();
		document.querySelector(".setup4-11").style.animation="placeTrowel_1 0.5s forwards";
		setTimeout(function(){
			document.querySelector(".setup4-11").style.visibility="hidden";
			document.querySelector(".setup4-12").style.visibility="visible";
			if(cnt===1)
			{
				myStopFunction();
				document.querySelector(".setup4-8").style.visibility="hidden";
			    document.querySelector(".setup4-9").style.visibility="visible";
			}
			if(cnt===2)
			{
				document.querySelector(".setup4-9").style.visibility="hidden";
			    document.querySelector(".setup4-10").style.visibility="visible";
			}
			if(cnt===3) document.querySelector(".setup4-10").style.visibility="hidden";
			    
			document.querySelector(".setup4-12").style.animation="placeTrowel_2 1s forwards";
			setTimeout(function(){
				document.querySelector(".setup4-12").style="position:absolute; left: 351px; top: 212px; visibility:visible;"
				document.querySelector(".setup4-12").style.transformOrigin="0 100%";
				document.querySelector(".setup4-12").style.animation="pourSoil 0.5s forwards";
				setTimeout(function(){
					if(cnt===3) document.querySelector(".setup4-14").style.visibility="visible";
					document.querySelector(".setup4-12").style="position: absolute; left: 48px; top: 409px; visibility:hidden;";
					document.querySelector(".setup4-13").style.visibility="visible";
					if(cnt===1)	blinkArrow("485","170",180,30);
					if(cnt>=2) 
					// blinkArrow("485","170",180,30);
					document.getElementById('arrow1').style="visibility:visible; position:absolute; left:485px; top:170px; height:30px; z-index: 10; transform:rotate(180deg);";

					document.querySelector(".setup4-13").addEventListener("click",function(){
						myStopFunction();
						
						document.querySelector(".setup4-13").style.animation="tamping 3s forwards";
						setTimeout(function(){
							
							document.querySelector(".setup4-13").style.visibility="hidden";
							cnt++;
						
							resetAnimation();
							if(cnt<=3)
							{
								
								pourSoilSampleAndTamp(cnt);
							}
							if(cnt>4){ myStopFunction(); displayNote("Make sure the soil is completely packed in the mould with no air gaps.","10","100");}
							
						},3500);
					});
				},500);
			},1000);
		},500);
	});
}



//my code
// function pourSoilSampleAndTamp(cnt) {
//     const setup11 = document.querySelector(".setup4-11");
//     const setup12 = document.querySelector(".setup4-12");
//     const setup13 = document.querySelector(".setup4-13");
//     const setup14 = document.querySelector(".setup4-14");

//     setup11.style.visibility = "visible";

//     // Blink arrow every time the animation is repeated
//     // blinkArrow("100", "390", 290, 30);
// 	myInt1 = setInterval(function () {
// 		animatearrow1();
// 	  }, 500);
// 	  document.getElementById("arrow2").style =
// 	  "visibility:visible ;position:absolute; left:100px; top:390px; height: 30px; z-index: 10;";
// 	document.getElementById("arrow2").style.WebkitTransform = "rotate(290deg)";
// 	document.getElementById("arrow2").style.msTransform = "rotate(290deg)";
// 	document.getElementById("arrow2").style.transform = "rotate(290deg)";

//     setup11.addEventListener("click", function () {
//         myStopFunction1();
//         setup11.style.animation = "placeTrowel_1 0.5s forwards";

//         setTimeout(function () {
//             setup11.style.visibility = "hidden";
//             setup12.style.visibility = "visible";

//             if (cnt == 1) {
//                 // myStopFunction();
//                 document.querySelector(".setup4-8").style.visibility = "hidden";
//                 document.querySelector(".setup4-9").style.visibility = "visible";
//             }

//             if (cnt == 2) {
//                 document.querySelector(".setup4-9").style.visibility = "hidden";
//                 document.querySelector(".setup4-10").style.visibility = "visible";
//             }

//             if (cnt == 3) document.querySelector(".setup4-10").style.visibility = "hidden";

//             setup12.style.animation = "placeTrowel_2 1s forwards";

//             setTimeout(function () {
//                 setup12.style = "position:absolute; left: 351px; top: 212px; visibility:visible;"
//                 setup12.style.transformOrigin = "0 100%";
//                 setup12.style.animation = "pourSoil 0.5s forwards";

//                 setTimeout(function () {
//                     if (cnt === 3) setup14.style.visibility = "visible";

//                     setup12.style = "position: absolute; left: 48px; top: 409px; visibility:hidden;";
//                     setup13.style.visibility = "visible";

//                     // Blink arrow every time the animation is repeated
//                     // blinkArrow("485", "170", 180, 30);
// 					myInt1 = setInterval(function () {
// 						animatearrow1();
// 					  }, 500);
// 					  document.getElementById("arrow2").style =
// 					  "visibility:visible ;position:absolute; left:485px; top:170px; height: 30px; z-index: 10;";
// 					document.getElementById("arrow2").style.WebkitTransform = "rotate(180deg)";
// 					document.getElementById("arrow2").style.msTransform = "rotate(180deg)";
// 					document.getElementById("arrow2").style.transform = "rotate(180deg)";
			
//                     setup13.addEventListener("click", function () {
//                         myStopFunction1();
//                         setup13.style.animation = "tamping 3s forwards";

//                         setTimeout(function () {
//                             setup13.style.visibility = "hidden";
//                             cnt++;
//                             resetAnimation();
// 							console.log(cnt);

//                             if (cnt <= 3) {
// 								if(cnt>=2){
// 									console.log("praj");
// 									document.getElementById("arrow2").style.visibility="hidden";
// 								}
//                                 pourSoilSampleAndTamp(cnt);
//                             }

//                             if (cnt > 4) {
//                                 myStopFunction1();
//                                 displayNote("Make sure the soil is completely packed in the mould with no air gaps.", "10", "100");
//                             }
//                         }, 3500);
//                     });
//                 }, 500);
//             }, 1000);
//         }, 500);
//     });
// }


// function pourSoilSampleAndTamp(){

	
//     document.querySelector(".setup4-11").style.visibility = "visible";


// 	myInt1 = setInterval(function () {
// 		animatearrow1();
// 	  }, 500);
// 	  document.getElementById("arrow2").style =
// 	  "visibility:visible ;position:absolute; left:100px; top:390px; height: 30px; z-index: 10;";
// 	document.getElementById("arrow2").style.WebkitTransform = "rotate(290deg)";
// 	document.getElementById("arrow2").style.msTransform = "rotate(290deg)";
// 	document.getElementById("arrow2").style.transform = "rotate(290deg)";
	
//    document.querySelector(".setup4-11").onclick = function () {
//         myStopFunction1();
//         document.querySelector(".setup4-11").style.animation = "placeTrowel_1 0.5s forwards";
		
// 		  setTimeout(function () {
// 			document.querySelector(".setup4-8").style.visibility="hidden";
// 			    document.querySelector(".setup4-9").style.visibility="visible";
//             document.querySelector(".setup4-11").style.visibility = "hidden";
//             document.querySelector(".setup4-12").style.visibility = "visible";
// 			document.querySelector(".setup4-12").style.animation = "placeTrowel_2 1s forwards";
// 			setTimeout(function () {
// 				                document.querySelector(".setup4-12").style = "position:absolute; left: 351px; top: 212px; visibility:visible;"
// 				                document.querySelector(".setup4-12").style.transformOrigin = "0 100%";
// 				                document.querySelector(".setup4-12").style.animation = "pourSoil 0.5s forwards";
// 								setTimeout(function () {
// 									document.querySelector(".setup4-12").style = "position: absolute; left: 48px; top: 409px; visibility:hidden;";
// 									document.querySelector(".setup4-13").style.visibility = "visible";
// 									myInt1 = setInterval(function () {
// 																animatearrow1();
// 															  }, 500);
// 															  document.getElementById("arrow2").style =
// 															  "visibility:visible ;position:absolute; left:485px; top:170px; height: 30px; z-index: 10;";
// 															document.getElementById("arrow2").style.WebkitTransform = "rotate(180deg)";
// 															document.getElementById("arrow2").style.msTransform = "rotate(180deg)";
// 															document.getElementById("arrow2").style.transform = "rotate(180deg)";
// 															document.querySelector(".setup4-13").onclick = function () {
// 																                        myStopFunction1();
// 																                        document.querySelector(".setup4-13").style.animation = "tamping 3s forwards";
// 																						setTimeout(function () {
// 																							document.querySelector(".setup4-13").style.visibility = "hidden";
// 																							                            // cnt++;
// 																							                            // resetAnimation();


// 																														document.querySelector(".setup4-11a").style.visibility = "visible";																						myInt1 = setInterval(function () {
// 																															animatearrow1();
// 																														  }, 500);
// 																														  document.getElementById("arrow2").style =
// 																														  "visibility:visible ;position:absolute; left:100px; top:390px; height: 30px; z-index: 10;";
// 																														document.getElementById("arrow2").style.WebkitTransform = "rotate(290deg)";
// 																														document.getElementById("arrow2").style.msTransform = "rotate(290deg)";
// 																														document.getElementById("arrow2").style.transform = "rotate(290deg)";
																														
// 																													   document.querySelector(".setup4-11a").onclick = function () {
// 																															myStopFunction1();
// 																															document.querySelector(".setup4-11a").style.animation = "placeTrowel_11 0.5s forwards";
																															
// 																															  setTimeout(function () {
// 																																document.querySelector(".setup4-9").style.visibility="hidden";
// 																																			    document.querySelector(".setup4-10").style.visibility="visible";
// 																																document.querySelector(".setup4-11a").style.visibility = "hidden";
// 																																document.querySelector(".setup4-12").style.visibility = "visible";
// 																																document.querySelector(".setup4-12").style.animation = "placeTrowel_22 1s forwards";
// 																																setTimeout(function () {
// 																																					document.querySelector(".setup4-12").style = "position:absolute; left: 351px; top: 212px; visibility:visible;"
// 																																					document.querySelector(".setup4-12").style.transformOrigin = "0 100%";
// 																																					document.querySelector(".setup4-12").style.animation = "pourSoil1 0.5s forwards";
// 																																					setTimeout(function () {
// 																																						document.querySelector(".setup4-12").style = "position: absolute; left: 48px; top: 409px; visibility:hidden;";
// 																																						document.querySelector(".setup4-13").style.visibility = "visible";
// 																																						myInt1 = setInterval(function () {
// 																																													animatearrow1();
// 																																												  }, 500);
// 																																												  document.getElementById("arrow2").style =
// 																																												  "visibility:visible ;position:absolute; left:485px; top:170px; height: 30px; z-index: 10;";
// 																																												document.getElementById("arrow2").style.WebkitTransform = "rotate(180deg)";
// 																																												document.getElementById("arrow2").style.msTransform = "rotate(180deg)";
// 																																												document.getElementById("arrow2").style.transform = "rotate(180deg)";
// 																																												document.querySelector(".setup4-13").onclick = function () {
// 																																																			myStopFunction1();
// 																																																			document.querySelector(".setup4-13").style.animation = "tamping1 3s forwards";
// 																																																			setTimeout(function () {
// 																																																				document.querySelector(".setup4-13").style.visibility = "hidden";
// 																																																											// cnt++;
// 																																																											// resetAnimation();
																													
// 																																																											document.querySelector(".setup4-11b").style.visibility = "visible";																						myInt1 = setInterval(function () {
// 																																																												animatearrow1();
// 																																																											  }, 500);
// 																																																											  document.getElementById("arrow2").style =
// 																																																											  "visibility:visible ;position:absolute; left:100px; top:390px; height: 30px; z-index: 10;";
// 																																																											document.getElementById("arrow2").style.WebkitTransform = "rotate(290deg)";
// 																																																											document.getElementById("arrow2").style.msTransform = "rotate(290deg)";
// 																																																											document.getElementById("arrow2").style.transform = "rotate(290deg)";
																																																											
// 																																																										   document.querySelector(".setup4-11b").onclick = function () {
// 																																																												myStopFunction1();
// 																																																												document.querySelector(".setup4-11b").style.animation = "placeTrowel_12 0.5s forwards";
																																																												
// 																																																												  setTimeout(function () {
// 																																																													document.querySelector(".setup4-10").style.visibility="hidden";
// 																																																													document.querySelector(".setup4-11b").style.visibility = "hidden";
// 																																																													document.querySelector(".setup4-12").style.visibility = "visible";
// 																																																													document.querySelector(".setup4-12").style.animation = "placeTrowel_23 1s forwards";
// 																																																													setTimeout(function () {
// 																																																																		document.querySelector(".setup4-12").style = "position:absolute; left: 351px; top: 212px; visibility:visible;"
// 																																																																		document.querySelector(".setup4-12").style.transformOrigin = "0 100%";
// 																																																																		document.querySelector(".setup4-12").style.animation = "pourSoil2 0.5s forwards";
// 																																																																		setTimeout(function () {
// 																																																																			document.querySelector(".setup4-12").style = "position: absolute; left: 48px; top: 409px; visibility:hidden;";
// 																																																																			document.querySelector(".setup4-13").style.visibility = "visible";
// 																																																																			myInt1 = setInterval(function () {
// 																																																																										animatearrow1();
// 																																																																									  }, 500);
// 																																																																									  document.getElementById("arrow2").style =
// 																																																																									  "visibility:visible ;position:absolute; left:485px; top:170px; height: 30px; z-index: 10;";
// 																																																																									document.getElementById("arrow2").style.WebkitTransform = "rotate(180deg)";
// 																																																																									document.getElementById("arrow2").style.msTransform = "rotate(180deg)";
// 																																																																									document.getElementById("arrow2").style.transform = "rotate(180deg)";
// 																																																																									document.querySelector(".setup4-13").onclick = function () {
// 																																																																																myStopFunction1();
// 																																																																																document.querySelector(".setup4-13").style.animation = "tamping2 3s forwards";
// 																																																																																setTimeout(function () {
// 																																																																																	document.querySelector(".setup4-13").style.visibility = "hidden";
// 																																																																																	document.querySelector(".nextButton").style.visibility="visible";																																																	// cnt++;
// 																																																																																								// resetAnimation();
																																																										
// 																																																																															}, 3500);
// 																																																																														};
																																																										
// 																																																																		}, 500);
// 																																																																	}, 1000);				
																																																														
// 																																																													}, 500);
// 																																																											};















// 																																																		}, 3500);
// 																																																	};
																													
// 																																					}, 500);
// 																																				}, 1000);				
																																	
// 																																}, 500);
// 																														};

// 																					}, 3500);
// 																				};

// 								}, 500);
// 							}, 1000);				
				
// 			}, 500);
// 	};


// }

function animatearrow()
{
    if (document.getElementById('arrow1').style.visibility=="hidden")
        document.getElementById('arrow1').style.visibility="visible";
    else
        document.getElementById('arrow1').style.visibility="hidden";
}

function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

function blinkArrow(l,t,correctAnswer,h)
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:"+l+"px; top:"+t+"px; height:"+h+"px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate("+correctAnswer+"deg)"; 
	document.getElementById("arrow1").style.msTransform = "rotate("+correctAnswer+"deg)";
	document.getElementById("arrow1").style.transform = "rotate("+correctAnswer+"deg)";
}


function navNext()
{
	for(temp=0;temp<12;temp++)
	{
		document.querySelector(".canvas"+temp).classList.add("hidden");
	}
	simsubscreennum+=1;
	document.querySelector(".canvas"+simsubscreennum).classList.remove("hidden");
	hideNextButton();
	magic();
}
var p3radio = document.getElementById('selectp3');
            var p12radio = document.getElementById('selectp12');
            if (p3radio.checked) sampletype = 1;
            else if (p12radio.checked) sampletype = 2;
			
			const sampleTypeRadios = document.querySelectorAll('input[name="sampletype"]');
function magic()
{
	if(simsubscreennum==1)
	{
		let count=0;
		let dataSentence="Height of the mould, h = ";
		// measureHieght(count,"170","399",180,30,"scale1-1","scale1-1Rotate","measureMouldHeight", dataSentence, mouldHeight);
		blinkArrow("170","399",180,30);
		document.querySelector(".scale").addEventListener("click",function()
		{
			count++;
			myStopFunction();
			document.querySelector(".scale").style.animation="measureMouldHeight 0.5s forwards";
			setTimeout(function(){
				document.querySelector(".data1-1").innerHTML="Height of the mould, L = "+mouldHeight+" cm";
				setTimeout(function(){
					document.querySelector(".scale").style.animation="";
					document.querySelector(".scale").classList.remove("scale1-1");
					document.querySelector(".scale").classList.add("scale1-1Rotate");
					if(count===1)
					{
						blinkArrow("337","248",270,30);
						document.querySelector(".scale").addEventListener("click",function()
						{
							myStopFunction();
							document.querySelector(".scale").style.animation="measureMouldDia 0.5s forwards";
							setTimeout(function()
							{
								document.querySelector(".data1-2").innerHTML="Diameter of the mould, d = "+mouldDia+" cm";
								document.querySelector(".scale").classList.add("hidden");
								setTimeout(function(){
									// displayNextButton();
									document.querySelector('.mould1-1').style.visibility="hidden";
									document.querySelector('.area-table').style.visibility="visible";
									calcTrack++;	
									evaluateCalculationAnswers('.area', mouldArea,'.check1', '.result1', '.mark1');
								},300);
							},500);
						});
					}
				},500);
			},600);
		});
	}
	if(simsubscreennum==2)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		// hideNextButton();
		document.querySelector('.area-vol-table').style.visibility="hidden";
		document.querySelector('.area-table').style.visibility="hidden";
		document.querySelector('.vol-table').style.visibility="hidden";
		hideNextButton();
		
		//Placeing sealing gasket 
		blinkArrow("175","425",270,30);
		document.querySelector(".setup2-3").addEventListener("click",function(){
			myStopFunction();
			document.querySelector(".setup2-3").style.visibility="hidden";
			document.querySelector(".setup2-2").style.visibility="visible";
			document.querySelector(".setup2-2").style.animation="placeSealingGasket 1.15s forwards";
			setTimeout(function(){
				document.querySelector(".setup2-2").style.visibility="hidden";
				document.querySelector(".setup2-3").style="position: absolute; left: 454px; top: 322px; visibility:visible;";
				
			//Placing porous stone
				document.querySelector(".setup2-5").style.visibility="visible";
				blinkArrow("175","425",270,30);
				document.querySelector(".setup2-5").addEventListener("click",function(){
					myStopFunction();
					document.querySelector(".setup2-5").style.visibility="hidden";
					document.querySelector(".setup2-6").style.visibility="visible";
					document.querySelector(".setup2-6").style.animation="placeSealingGasket 1.15s forwards";
					setTimeout(function(){
						document.querySelector(".setup2-6").style.visibility="hidden";
						document.querySelector(".setup2-5").style="position: absolute; left: 460px; top: 328px; visibility:visible;";
						setTimeout(function(){
							displayNextButton();
						},300);
					},1150);
				});
			},1150);
		});
	}
	if(simsubscreennum==3)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		document.querySelector(".setup2-3").style.visibility="hidden";
		document.querySelector(".setup2-5").style.visibility="hidden";
		hideNextButton();
		blinkArrow("163","400",270,30);
		document.querySelector(".setup3-5").addEventListener("click",function(){
			myStopFunction();
			document.querySelector(".setup3-5").style.visibility="hidden";
			document.querySelector(".setup3-7").style.visibility="visible";
			document.querySelector(".setup3-7").style.animation="placeFullMould_1 0.75s forwards";
			setTimeout(function(){
				document.querySelector(".setup3-6").style.visibility="visible";
				document.querySelector(".setup3-7").style.animation="placeFullMould_2 1.5s forwards";
				document.querySelector(".setup3-6").style.animation="placeHalfMould 1.5s forwards";
				setTimeout(function(){
					document.querySelector(".setup3-7").style.visibility="hidden";
					document.querySelector(".setup3-5").style="visibility:visible; position:absolute; left:439px; top:303px;";
					
					//place nut and tighten it
					setTimeout(function(){
						document.querySelector(".setup3-8").style.visibility="visible";
						blinkArrow("552","268",180,20);
						document.querySelector(".setup3-8").addEventListener("click",function(){
							myStopFunction();
							document.querySelector(".setup3-8").style.animation="placeNut 0.75s forwards";
							setTimeout(function(){
								document.querySelector(".setup3-9").style.visibility="visible";
								document.querySelector(".setup3-9").style.transformOrigin="0% 100%";
								document.querySelector(".setup3-9").style.animation="tightenNut 0.5s 2 forwards";
								setTimeout(function(){
									document.querySelector(".setup3-8").style.visibility="hidden";
									document.querySelector(".setup3-9").style.visibility="hidden";
									document.querySelector(".setup3-10").style.visibility="visible";
									displayNote("Fasten all the remaing bolts.","150","150");
								},1000);
							},750);
						});
					},500);
				},1600);
			},750);
		});
	}
	if(simsubscreennum==4)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		document.querySelector(".setup3-5").style.visibility="hidden";
		document.querySelector(".setup3-6").style.visibility="hidden";
		document.querySelector(".setup3-10").style.visibility="hidden";
		document.querySelector(".setup3-11").style.visibility="hidden";
		
		pourSoilSampleAndTamp(1);
	}
	if(simsubscreennum==5)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		document.querySelector(".setup4-4").style.visibility="hidden";
		document.querySelector(".setup4-14").style.visibility="hidden";
		document.querySelector(".setup5-8").style.visibility="visible";
		setTimeout(function(){
			placeFilterPaper(".setup5-8",".setup5-9");
		},300);
	}
	if(simsubscreennum==6)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		document.querySelector(".setup5-4").style.visibility="hidden";
		document.querySelector(".setup5-10").style.visibility="hidden";
		//Placing top plate on top of mould
		blinkArrow(194,450,270,30);
		document.querySelector(".setup6-8").addEventListener("click",function(){
			myStopFunction();
			document.querySelector(".setup6-8").style.animation="placeTopPlate_1 1s forwards";
			setTimeout(function(){

				document.querySelector(".setup6-8").style="position:absolute; left: 439px; top: 220px;";
				document.querySelector(".setup6-9").style.visibility="visible";
				document.querySelector(".setup6-10").style.visibility="visible";
				document.querySelector(".setup6-11").style.visibility="visible";
				document.querySelector(".setup6-8").style.animation="placeTopPlate_2 0.5s forwards";
				document.querySelector(".setup6-9").style.animation="placeTopPlate_left 0.5s forwards";
				document.querySelector(".setup6-10").style.animation="placeTopPlate_right 0.5s forwards";
				document.querySelector(".setup6-11").style.animation="placeTopPlate_behind 0.5s forwards";
				
				//fasten top plate by nut & bolt mechanism
				setTimeout(function(){
					document.querySelector(".setup6-12").style.visibility="visible";
					blinkArrow(463,263,180,20);
					document.querySelector(".setup6-12").addEventListener("click",function(){
						myStopFunction();
						document.querySelector(".setup6-12").style.animation="placeBolt 0.5s forwards";
						setTimeout(function(){
							document.querySelector(".setup6-13").style.visibility="visible";
							setTimeout(function(){
								document.querySelector(".setup6-13").style.transformOrigin="0% 100%";
								document.querySelector(".setup6-13").style.animation="tightenNut 0.5s 2 forwards";
								setTimeout(function(){
									document.querySelector(".setup6-13").style.visibility="hidden";
									document.querySelector(".setup6-12").style.visibility="hidden";
									document.querySelector(".setup6-14").style.visibility="visible";
									displayNote("Fasten all the remaing bolts.","150","150");
								},1000);
							},250);
						},500);
					});
				},1000);
			},1000);
		});
	}
	if(simsubscreennum==7)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		document.querySelector(".setup6-4").style.visibility="hidden";
		document.querySelector(".setup6-7").style.visibility="hidden";
		document.querySelector(".setup6-9").style.visibility="hidden";
		document.querySelector(".setup6-10").style.visibility="hidden";
		document.querySelector(".setup6-11").style.visibility="hidden";
		document.querySelector(".setup6-14").style.visibility="hidden";
		document.querySelector(".setup6-15").style.visibility="hidden";
		document.querySelector(".setup6-16").style.visibility="hidden";
		
		setTimeout(function()
		{
			blinkArrow(263,541,388,30);
			document.querySelector(".setup7-5").addEventListener("click",function(){
				myStopFunction();
				document.querySelector(".setup7-4").style.visibility="visible";
				document.querySelector(".setup7-3").style.animation="connectPipe 0.5s forwards";
				document.querySelector(".setup7-4").style.animation="moveHand 0.5s forwards";
				setTimeout(function(){
					document.querySelector(".setup7-4").style.visibility="hidden";
					document.querySelector(".setup7-5").style="height: 20px; position: absolute; left: 192px; top: 344px; width: 15px;";
					setTimeout(function()
					{
						displayNote("Open the air release valve  to make the soil sample completely saturated before finding the permeability of the soil.", "350","150");
					},500);
				},500);
			});
		},500);
	}
	if(simsubscreennum==8)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		// nextButton.classlist.add("hidden");
		setTimeout(function()
		{
			blinkArrow(342,331,180,30);
			document.querySelector(".setup8-5a").addEventListener("click",function(){
				myStopFunction();
				document.querySelector(".setup8-5a").style.animation="openValve 0.5s forwards";
				setTimeout(function(){
					document.querySelector(".setup8-5a").style.visibility="hidden";
					document.querySelector(".setup8-5b").style.visibility="visible";
					document.querySelector(".setup8-7").style.visibility="visible";
					displayNote("Observe the water flow through the air release valve, then stop the water supply.","450","180");
				},500);
			});
		},500);
	}
	if(simsubscreennum==9)
	// myStopFunction();	
	{document.querySelector(".nextButton").style.visibility="hidden";
	document.querySelector(".setup8-5b").style.visibility="hidden";
		document.querySelector(".setup6-4").style.visibility="hidden";
		document.querySelector(".setup6-7").style.visibility="hidden";
		document.querySelector(".setup6-9").style.visibility="hidden";
		document.querySelector(".setup6-10").style.visibility="hidden";
		document.querySelector(".setup6-11").style.visibility="hidden";
		document.querySelector(".setup6-14").style.visibility="hidden";
		document.querySelector(".setup6-15").style.visibility="hidden";
		document.querySelector(".setup6-16").style.visibility="hidden";
		
	
		//   const nextButton = document.getElementById('nextButton');
		  
		  // Add a click event listener to each radio button
		  sampleTypeRadios.forEach((radio) => {
			radio.addEventListener('click', () => {
				if (radio.checked) {
					document.querySelector(".nextButton").style.visibility="visible";
				  } else {
					document.querySelector(".nextButton").style.visibility="hidden";
				  }
			});
		  });
	}
	
	if(simsubscreennum==10)
	{
		// var type=sampletype;
		// myStopFunction();
		document.querySelector(".nextButton").style.visibility="hidden";
		var selectedValue = document.querySelector('input[name="sampletype"]:checked').value;
		
		if(selectedValue === "1")
        {
			document.querySelector(".setup9-4").style.visibility="hidden";
		document.querySelector(".nextButton").style.visibility="hidden";
		// blinkArrow(564,208,180,30);
		myInt1 = setInterval(function () {
			animatearrow1();
		  }, 500);
		  document.getElementById("arrow2").style =
		  "visibility:visible ;position:absolute; left:564px; top:208px; height: 30px; z-index: 10;";
		document.getElementById("arrow2").style.WebkitTransform = "rotate(180deg)";
		document.getElementById("arrow2").style.msTransform = "rotate(180deg)";
		document.getElementById("arrow2").style.transform = "rotate(180deg)";
		document.getElementById("9-1-3").style.visibility="visible"; 
		document.getElementById("9-1-3").onclick = function () {
		myStopFunction1();
		// document.querySelector(".nextButton").style.visibility="hidden";
		document.getElementById("9-1-3").style.transformOrigin = "80% 90%";
		document.getElementById("9-1-3").style.animation = "movehy31 3s forwards";
		document.querySelector(".setup9-4").style.visibility="hidden";
		document.querySelector(".setup9-4b").style.visibility="hidden";
		setTimeout(function(){
		  document.getElementById("grad41").style.visibility="visible";
		  document.getElementById("grad41").style.animation = "movehy1 1s forwards";
		  setTimeout(function(){
			document.getElementById("9-1-3").style.visibility="hidden";
			document.getElementById("9-1-4").style.visibility="visible";
			// document.getElementById("grad2").style.visibility="visible"; 
		  document.getElementById("grad2").style.animation =
				"moveWater 1s forwards";
				setTimeout(function(){
				  document.getElementById("9-1-4").style.visibility="hidden";
				//   document.getElementById("grad4").style.visibility="hidden";
	
				document.querySelector(".nextButton").style.visibility="hidden";
				document.querySelector(".setup8-5b").style.visibility="hidden";
				displayNote("Water pipe is removed from outlet valve and connected to inlet valve at the top. Now start the water supply maintaining a constant head of water.","450","120");
				},2000);
		  },500);
		  
	
		},3000);
	  }
     }
	 if(selectedValue === "2")
    {document.querySelector(".setup10-41").style.visibility="hidden";
		document.querySelector(".setup9-41").style.visibility="hidden";
		document.querySelector(".nextButton").style.visibility="hidden";
		blinkArrow(564,208,180,30);
		document.getElementById("9-1-3").style.visibility="visible"; 
		document.getElementById("9-1-3").onclick = function () {
		myStopFunction();
		document.querySelector(".nextButton").style.visibility="hidden";
		document.getElementById("9-1-3").style.transformOrigin = "80% 90%";
		document.getElementById("9-1-3").style.animation = "movehy 3s forwards";
		
		setTimeout(function(){

		  document.getElementById("grad4").style.visibility="visible";
		  document.getElementById("grad4").style.animation = "movehy22 1s forwards";
		  setTimeout(function(){
			document.getElementById("9-1-3").style.visibility="hidden";
			document.getElementById("9-1-41").style.visibility="visible";
			// document.getElementById("grad2").style.visibility="visible"; 
		  document.getElementById("grad2").style.animation =
				"moveWater 1s forwards";
				setTimeout(function(){
				  document.getElementById("9-1-41").style.visibility="hidden";
				//   document.getElementById("grad4").style.visibility="hidden";
	
				document.querySelector(".nextButton").style.visibility="hidden";
				document.querySelector(".setup8-5b").style.visibility="hidden";
				displayNote("Water pipe is removed from outlet valve and connected to inlet valve at the top. Now start the water supply maintaining a constant head of water.","450","120");
				},2000);
		  },500);
		  
	
		},3000);
	  }
	}
		// nextButton.classlist.add("hidden");
		
	}
	if(simsubscreennum==11)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		myStopFunction();
		// document.querySelector(".setup9-4b").style.visibility="hidden";
		document.querySelector(".setup9-42").style.visibility="hidden";
		document.querySelector(".setup9-42b").style.visibility="hidden";
		document.querySelector(".setup9-41a").style.visibility="hidden";
		document.getElementById('arrow1').style.visibility="hidden";
		var selectedValue = document.querySelector('input[name="sampletype"]:checked').value;
		document.querySelector(".nextButton").style.visibility="hidden";
		document.querySelector(".setup9-6").style.visibility="hidden";
		document.querySelector(".setup8-5b").style.visibility="hidden";
		// displayNote("Water pipe is removed from outlet valve and connected to inlet valve at the top. Now start the water supply maintaining a constant head of water.","450","120");
		document.querySelector(".nextButton").style.visibility="hidden";
		document.querySelector(".setup9-6").style.visibility="hidden";
		document.querySelector(".drop10-1").style.animation="drops 0.5s linear infinite";
		setTimeout(function()
		{
			document.querySelector(".setup10-4").style.visibility="hidden";
			document.querySelector(".drop10-2").style.animation="drops 0.5s linear infinite";
			document.querySelector(".setup10-6").style.animation="fillWater 25s forwards";
			
			document.querySelector(".setup10-8").style.transformOrigin="0 100%";
			document.querySelector(".setup10-8").style.animation="rotateNeedle 2s linear 7";
			if(selectedValue === "1"){
				// document.getElementById('arrow1').style.visibility="hidden";
				// create_totalTable(".table10",2000);

				document.getElementById("grad41").style.animation = "movehy33 18s forwards";
				document.querySelector(".table10").style.visibility="visible";
				// generate_table()
				create_totalTable(".table10",1500);
				setTimeout(function()
			{
				document.querySelector(".setup10-6").style="position:absolute; left: 438px;top: 505px;"
				setTimeout(function()
			{
				// if(selectedValue === "1"){
					document.getElementById('arrow1').style.visibility="hidden";
				validateFormativeQA(2,0,"490px","319px");
				// displayNextButton();
				// }
				// if(selectedValue === "2"){
				// 	document.getElementById('arrow1').style.visibility="hidden";
				// 	validateFormativeQA(2,1,"490px","319px");
				// 	// displayNextButton();
				// 	}
				
			},15000);
			},1000);
			}
			if(selectedValue === "2"){
				document.getElementById("grad41").style.visibility="hidden";
				document.querySelector(".setup9-42").style.visibility="hidden";
				document.querySelector(".setup9-42b").style.visibility="hidden";
				document.getElementById('arrow1').style.visibility="hidden";
				document.getElementById("grad4").style.animation = "movehy11 18s forwards";
				document.querySelector(".table101").style.visibility="visible";
				// generate_table1()
				create_totalTable(".table101",1500);
				setTimeout(function()
			{
				document.querySelector(".setup10-6").style="position:absolute; left: 438px;top: 505px;"
				setTimeout(function()
			{
				// if(selectedValue === "1"){
				// 	document.getElementById('arrow1').style.visibility="hidden";
				// validateFormativeQA(2,0,"490px","319px");
				// // displayNextButton();
				// }
				// if(selectedValue === "2"){
					document.getElementById('arrow1').style.visibility="hidden";
					validateFormativeQA(2,1,"490px","319px");
					// displayNextButton();
					// }
				
			},15000);
			},1000);
			}
			
			
			
		},250);
	}
	if(simsubscreennum==12)
	{
		document.querySelector(".nextButton").style.visibility="hidden";
		myStopFunction();
		document.getElementById('arrow1').style.visibility="hidden";
		document.querySelector(".table101").style.visibility="hidden";
		document.getElementById("table10").style.visibility="hidden";
		var selectedValue = document.querySelector('input[name="sampletype"]:checked').value;
		console.log("Table");
		if(selectedValue === "1"){
console.log("Table1");
			document.getElementById("table11-1").style.visibility="visible";
			document.querySelector(".setup9-42b").style.visibility="hidden";
			document.getElementById("grad41").style.visibility="hidden";
			document.getElementById("grad4").style.visibility="hidden";
			document.querySelector(".nextButton").style.visibility="hidden";
			variables.classList.remove("hidden");
			varDescription.innerHTML="Length of soil sample, L = 61cm</br>Diameter of mould, D = 7.8cm </br>Area of c/s, A = 47.78cm<sup>2</sup></br>Volume of mould , V =291.48cm<sup>3</sup><br>Diameter of standpipe, d = 1 cm<br>Area of standpipe, a = 0.79cm<sup>2</sup> ";
			document.querySelector(".setup9-4b").style.visibility="hidden";
			calcTrack=1;
			document.getElementById("table11-2").style.visibility="hidden";
			
			document.getElementById("btn2").style.visibility="visible";

			// evaluateCalculationAnswers(".avg",avgOfQ,".check3",".result3",".mark3")
			}
		if(selectedValue === "2"){
			console.log("Table2");
			document.getElementById("table11-2").style.visibility="visible";
		document.querySelector(".setup9-42b").style.visibility="hidden";
		document.getElementById("grad41").style.visibility="hidden";
		document.getElementById("grad4").style.visibility="hidden";
		document.querySelector(".nextButton").style.visibility="hidden";
		variables.classList.remove("hidden");
		varDescription.innerHTML="Length of soil sample, L = 61cm</br>Diameter of mould, D = 7.8cm </br>Area of c/s, A = 47.78cm<sup>2</sup></br>Volume of mould , V =291.48cm<sup>3</sup><br>Diameter of standpipe, d = 2 cm<br>Area of standpipe, a = 3.14cm<sup>2</sup> ";
		document.querySelector(".setup9-4b").style.visibility="hidden";
		calcTrack=1;
		
			document.getElementById("table11-1").style.visibility="hidden";
		document.getElementById("btn1").style.visibility="visible";
		evaluateCalculationAnswers(".avg",avgOfQ,".check3",".result3",".mark3")
		}
	}
	
}


clkCount1=0;

// let ar2 = [

// 4.43* Math.pow(10, -4),

// 	4.40*Math.pow(10, -4),
// 	4.49* Math.pow(10, -4),
// 	4.43* Math.pow(10, -4),
	
// 	4.45* Math.pow(10, -4),
// 	4.42* Math.pow(10, -4),
// 	4.41* Math.pow(10, -4),
	
// 	4.39* Math.pow(10, -4),
// 	4.35* Math.pow(10, -4)
	
// 	];
let arr2 = ["4.43",

	"4.40",
	"4.49",
	"4.43",
	
	"4.45",
	"4.42",
	"4.41",
	
	"4.39",
	"4.35"];

function checkInput2() {
  let inputs = [document.getElementById("hi-1"),  document.getElementById("hi-3"), document.getElementById("hi-5"),  document.getElementById("hi-7"),document.getElementById("hi-9"),document.getElementById("hi-11"), document.getElementById("hi-13"), document.getElementById("hi-15"), document.getElementById("hi-17")];
  let anyInputEmpty = false;
  for (let i = 0; i < inputs.length; i++) {
	  if (inputs[i].value === "") {
		  anyInputEmpty = true;
		  document.getElementById("alerttxt2").style.visibility="visible";
	  }
	  
  }
  if (anyInputEmpty) {
	  return;
  }
  document.getElementById("alerttxt2").style.visibility="hidden";
  clkCount1++;
  let allInputsCorrect = true;
  for (let i = 0; i < inputs.length; i++) {
	  console.log("red");
	  if (inputs[i].value === arr2[i]) {
		  inputs[i].style.color = "green";
		 
  
	  } else {
		  allInputsCorrect = false;
		  inputs[i].style.color = "red";
	  }
  // setTimeout(() => {
  // 		inputs[i].style.color = "black";
  // 	}, 3000);
		  // inputs[i].style.color = "black";
	  
  }
  if (clkCount1 == 2) {
	  document.getElementById("btn2").style.visibility="hidden";
	  document.getElementById("resbtn2").style.visibility = "visible";
  }
  if (allInputsCorrect) {
	document.getElementById("hi-2").style.visibility="visible";
	document.getElementById("hi-8").style.visibility="visible";
	document.getElementById("hi-14").style.visibility="visible";
	 	document.getElementById("btn22").style.visibility="visible";
	  document.getElementById("btn2").style.visibility = "hidden";
	  document.getElementById("resbtn2").style.visibility = "hidden";
	  
  }
}
function getResult2() {
  let inputs = [document.getElementById("hi-1"),  document.getElementById("hi-3"), document.getElementById("hi-5"),  document.getElementById("hi-7"),document.getElementById("hi-9"),document.getElementById("hi-11"), document.getElementById("hi-13"), document.getElementById("hi-15"), document.getElementById("hi-17")];
  for (let i = 0; i < inputs.length; i++) {
	  inputs[i].value = arr2[i];
	  inputs[i].style.color = "green";
	  document.getElementById("hi-2").style.visibility="visible";
	  document.getElementById("hi-8").style.visibility="visible";
	  document.getElementById("hi-14").style.visibility="visible";
  }
  document.getElementById("resbtn2").style.visibility = "hidden";
  document.getElementById("btn22").style.visibility="visible";

  // document.getElementById("nextButton").style.visibility = "visible";
}
  
function showTooltip1(){
	document.getElementById("ttp1").style.visibility = "visible"										
}
function hideTooltip1(){
	document.getElementById("ttp1").style.visibility = "hidden"										
}

let currentRow = 0;

function generate_table(){
	for(let i=0; i<=dataset.length; i++){
		var runner = setTimeout(function(){
			let rows = tableData.insertRow(-1);
			clearTimeout(runner);
			eachRow(rows,dataset[i])
		},interval*increment);
		increment = increment+1;
	}
}
function eachRow(rows,row){
	for(let i=0;i<4; i++){
		rows.insertCell(i).innerHTML = row[i]
}}








let arr1 = ["3.52",
	"3.63",
	"3.57",
	"3.62",
	
	"3.75",
	"3.72",
	"3.72",

	"3.60",
	"3.61",];

function checkInput1() {
  let inputs = [document.getElementById("gi-1"),  document.getElementById("gi-3"), document.getElementById("gi-5"),  document.getElementById("gi-7"), document.getElementById("gi-9"),document.getElementById("gi-11"), document.getElementById("gi-13"), document.getElementById("gi-15"), document.getElementById("gi-17")];
  let anyInputEmpty = false;
  for (let i = 0; i < inputs.length; i++) {
	  if (inputs[i].value === "") {
		  anyInputEmpty = true;
		  document.getElementById("alerttxt").style.visibility="visible";
	  }
	  
  }
  if (anyInputEmpty) {
	  return;
  }
  document.getElementById("alerttxt").style.visibility="hidden";
  clkCount1++;
  let allInputsCorrect = true;
  for (let i = 0; i < inputs.length; i++) {
	  console.log("red");
	  if (inputs[i].value === arr1[i]) {
		  inputs[i].style.color = "green";
	  
  
	  } else {
		  allInputsCorrect = false;
		  inputs[i].style.color = "red";
	  }
  // setTimeout(() => {
  // 		inputs[i].style.color = "black";
  // 	}, 3000);
		  // inputs[i].style.color = "black";
	  
  }
  if (clkCount1 == 2) {
	  document.getElementById("btn1").style.visibility="hidden";
	  document.getElementById("resbtn1").style.visibility = "visible";
  }
  if (allInputsCorrect) {
	document.getElementById("gi-2").style.visibility="visible";
	document.getElementById("gi-8").style.visibility="visible";
	document.getElementById("gi-14").style.visibility="visible";
	document.getElementById("btn11").style.visibility="visible";
	  document.getElementById("btn1").style.visibility = "hidden";
	  document.getElementById("resbtn1").style.visibility = "hidden";
  }
}

function getResult1() {
	let inputs = [document.getElementById("gi-1"), document.getElementById("gi-3"), document.getElementById("gi-5"),  document.getElementById("gi-7"), document.getElementById("gi-9"),document.getElementById("gi-11"), document.getElementById("gi-13"),  document.getElementById("gi-15"), document.getElementById("gi-17")];
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].value = arr1[i];
		inputs[i].style.color = "green";
	}
	document.getElementById("gi-2").style.visibility="visible";
	document.getElementById("gi-8").style.visibility="visible";
	document.getElementById("gi-14").style.visibility="visible";
	document.getElementById("resbtn1").style.visibility = "hidden";
	document.getElementById("btn11").style.visibility="visible";
  
	// document.getElementById("nextButton").style.visibility = "visible";
  }











clkCount2=0;
  let arr4 = [ "4.40",
  "4.43",
  "4.38"
	
	];

function checkInput22() {
  let inputs = [document.getElementById("hi-2"),  document.getElementById("hi-8"), document.getElementById("hi-14")];
  let anyInputEmpty = false;
  for (let i = 0; i < inputs.length; i++) {
	  if (inputs[i].value === "") {
		  anyInputEmpty = true;
		  document.getElementById("alerttxt22").style.visibility="visible";
	  }
	  
  }
  if (anyInputEmpty) {
	  return;
  }
  document.getElementById("alerttxt22").style.visibility="hidden";
  clkCount2++;
  let allInputsCorrect = true;
  for (let i = 0; i < inputs.length; i++) {
	  console.log("red");
	  if (inputs[i].value === arr4[i]) {
		  inputs[i].style.color = "green";
		  
  
	  } else {
		  allInputsCorrect = false;
		  inputs[i].style.color = "red";
	  }
  // setTimeout(() => {
  // 		inputs[i].style.color = "black";
  // 	}, 3000);
		  // inputs[i].style.color = "black";
	  
  }
  if (clkCount2 == 2) {
	  document.getElementById("btn22").style.visibility="hidden";
	  document.getElementById("resbtn22").style.visibility = "visible";
  }
  if (allInputsCorrect) {
	 
	  document.getElementById("btn22").style.visibility = "hidden";
	  document.getElementById("resbtn22").style.visibility = "hidden";
	  document.querySelector(".inference1").style.visibility="visible";
  }
}
function getResult22() {
  let inputs = [document.getElementById("hi-2"),  document.getElementById("hi-8"), document.getElementById("hi-14")];
  for (let i = 0; i < inputs.length; i++) {
	  inputs[i].value = arr4[i];
	  inputs[i].style.color = "green";
	  
  }
  document.getElementById("resbtn22").style.visibility = "hidden";
  document.querySelector(".inference1").style.visibility="visible";
  // document.getElementById("nextButton").style.visibility = "visible";
}







clkCount3=0;
  let arr5 = ["3.58",


  "3.70",
  
  
  "3.64"
  
  
	
	];

function checkInput11() {
  let inputs = [document.getElementById("gi-2"),  document.getElementById("gi-8"), document.getElementById("gi-14")];
  let anyInputEmpty = false;
  for (let i = 0; i < inputs.length; i++) {
	  if (inputs[i].value === "") {
		  anyInputEmpty = true;
		  document.getElementById("alerttxt11").style.visibility="visible";
	  }
	  
  }
  if (anyInputEmpty) {
	  return;
  }
  document.getElementById("alerttxt11").style.visibility="hidden";
  clkCount3++;
  let allInputsCorrect = true;
  for (let i = 0; i < inputs.length; i++) {
	  console.log("red");
	  if (inputs[i].value === arr5[i]) {
		  inputs[i].style.color = "green";
		  
  
	  } else {
		  allInputsCorrect = false;
		  inputs[i].style.color = "red";
	  }
  // setTimeout(() => {
  // 		inputs[i].style.color = "black";
  // 	}, 3000);
		  // inputs[i].style.color = "black";
	  
  }
  if (clkCount3 == 2) {
	  document.getElementById("btn11").style.visibility="hidden";
	  document.getElementById("resbtn11").style.visibility = "visible";
  }
  if (allInputsCorrect) {
	
	 
	  document.getElementById("btn11").style.visibility = "hidden";
	  document.getElementById("resbtn11").style.visibility = "hidden";
	  document.querySelector(".inference").style.visibility="visible";
  }
}
function getResult11() {
  let inputs = [document.getElementById("gi-2"),  document.getElementById("gi-8"), document.getElementById("gi-14")];
  for (let i = 0; i < inputs.length; i++) {
	  inputs[i].value = arr5[i];
	  inputs[i].style.color = "green";
	  
  }
  
  document.getElementById("resbtn11").style.visibility = "hidden";
  document.querySelector(".inference").style.visibility="visible";

  // document.getElementById("nextButton").style.visibility = "visible";
}