const cards=[
 {name:"Overview",icon:"▦",title:"Aqua Homes Portfolio",metric:"18 active",submetric:"6 approvals · 4 client replies",note:"The demonstration portfolio is stable. Four client replies and two payroll approvals are waiting.",check:"18 active projects were compared with the local demo register. Six approvals and four replies are correctly represented."},
 {name:"Site Intelligence",icon:"◇",title:"Tower A · Level 34",metric:"92% clear",submetric:"2 risks · 14 verified zones",note:"Fourteen field zones are verified. Two demonstration risks remain and today’s concrete work is on track.",check:"Fourteen demo zones contain completed checks. Two zones remain flagged for owner review."},
 {name:"Financial Command",icon:"$",title:"Northshore Mega Project",metric:"$14.78M",submetric:"$13.21M committed · 89% funded",note:"The demonstration project is 89% funded. One procurement variance needs review.",check:"The displayed funding ratio matches the demo values: $13.21M committed against $14.78M budget, rounded to 89%."},
 {name:"Operations",icon:"≋",title:"Today’s Execution",metric:"47 on site",submetric:"3 crews · 96% time capture",note:"All demonstration foremen checked in. The HVAC crew arrival moved to 10:15 AM.",check:"Three demo crews are active. Forty-five of forty-seven worker entries contain time capture, rounded to 96%."},
 {name:"Risk Monitor",icon:"△",title:"Portfolio Watch",metric:"2 alerts",submetric:"1 critical path",note:"The concrete-pour delay is the only demonstration critical-path exposure.",check:"Two demo alerts are open. The concrete pour is the only alert marked as affecting the critical path."}
];
let active=2,sheetState="closed",dragX=null,transcriptTimer=null,localRecognition=null;
const sentinel=document.getElementById("sentinel"),deck=document.getElementById("cardLayers"),dots=document.getElementById("cardDots"),sheet=document.getElementById("detailSheet"),transcript=document.getElementById("transcript");
const voiceButton=document.getElementById("voiceButton"),askAqua=document.getElementById("askAqua"),previousCard=document.getElementById("previousCard"),nextCard=document.getElementById("nextCard"),budgetPanel=document.getElementById("budgetPanel"),riskPanel=document.getElementById("riskPanel"),closeSheet=document.getElementById("closeSheet"),checkInformation=document.getElementById("checkInformation"),toggleDepthButton=document.getElementById("toggleDepth");
const sheetEyebrow=document.getElementById("sheetEyebrow"),sheetTitle=document.getElementById("sheetTitle"),sheetMetric=document.getElementById("sheetMetric"),sheetSubmetric=document.getElementById("sheetSubmetric"),sheetNote=document.getElementById("sheetNote"),checkResult=document.getElementById("checkResult");
const positions=[-2,-1,0,1,2];
function relative(index){let value=(index-active+cards.length)%cards.length;return value>2?value-cards.length:value}
function setState(state){sentinel.className=`sentinel state-${state}`}
function showTranscript(text,persistent=false){clearTimeout(transcriptTimer);transcript.textContent=text;transcript.hidden=false;if(!persistent)transcriptTimer=setTimeout(()=>transcript.hidden=true,5200)}
function renderCards(){
 deck.innerHTML="";dots.innerHTML="";
 cards.forEach((card,index)=>{
  const offset=relative(index),button=document.createElement("button");
  button.type="button";button.className=`command-card${offset===0?" active":""}`;
  const left={[-2]:1,[-1]:18,[0]:37.5,[1]:62,[2]:79}[offset];
  const scale=offset===0?1.13:Math.abs(offset)===1?.92:.82;
  const rotate=offset*-7;
  button.style.left=`${left}%`;button.style.zIndex=String(5-Math.abs(offset));button.style.opacity=Math.abs(offset)===2?".72":"1";
  button.style.transform=`translateX(-50%) scale(${scale}) rotateY(${rotate}deg)`;
  button.innerHTML=`<h3><i>${card.icon}</i>${card.name}</h3><div class="mini-visual"></div><strong>${card.metric}</strong><small>${card.submetric}</small>`;
  button.setAttribute("aria-label",`${offset===0?"Open":"Rotate to"} ${card.name}`);
  button.onclick=()=>offset===0?openCard(index):selectCard(index);
  deck.appendChild(button);
  const dot=document.createElement("button");dot.type="button";dot.className=index===active?"active":"";dot.setAttribute("aria-label",`Show ${card.name}`);dot.onclick=()=>selectCard(index);dots.appendChild(dot);
 });
}
function selectCard(index){active=index;closeDetails();renderCards()}
function rotate(direction){active=(active+direction+cards.length)%cards.length;closeDetails();renderCards()}
function openCard(index=active,view="half"){active=index;renderCards();sheetState=view;sheet.className=`detail-sheet ${view}`;const card=cards[index];sheetEyebrow.textContent=card.name;sheetTitle.textContent=card.title;sheetMetric.textContent=card.metric;sheetSubmetric.textContent=card.submetric;sheetNote.textContent=card.note;checkResult.hidden=true;toggleDepthButton.textContent=view==="full"?"Half screen":"Go deeper"}
function closeDetails(){sheetState="closed";sheet.className="detail-sheet closed"}window.closeAquaDetails=closeDetails;
function speak(text){showTranscript(`Aqua: ${text}`);if(window.AquaBridge?.speak){window.AquaBridge.speak(text)}else if("speechSynthesis"in window){const u=new SpeechSynthesisUtterance(text);u.onstart=()=>window.setAquaSpeaking(true);u.onend=()=>window.setAquaSpeaking(false);speechSynthesis.cancel();speechSynthesis.speak(u)}}
function checkCurrent(){openCard(active,sheetState==="closed"?"half":sheetState);checkResult.textContent=`✓ Demo check complete — ${cards[active].check}`;checkResult.hidden=false;speak(`Check complete. ${cards[active].check}`)}
function commandResponse(raw){
 const text=raw.toLowerCase().trim();
 if(/\b(next|right|rotate forward)\b/.test(text)){rotate(1);return`Showing ${cards[active].name}.`}
 if(/\b(previous|back|left|rotate backward)\b/.test(text)){rotate(-1);return`Showing ${cards[active].name}.`}
 const found=cards.findIndex(c=>text.includes(c.name.toLowerCase().split(" ")[0]));
 if(found>=0&&(text.includes("open")||text.includes("show")||text.includes("tell")||text.includes("what"))){openCard(found);return cards[found].note}
 if(text.includes("check")||text.includes("verify")||text.includes("confirm information")){setTimeout(checkCurrent,50);return`I am checking ${cards[active].name} against the local demonstration register.`}
 if(text.includes("summar")||text.includes("brief")||text.includes("happening")){openCard(active);return cards[active].note}
 if(text.includes("deeper")||text.includes("full screen")){openCard(active,"full");return`${cards[active].name} is open full screen.`}
 if(text.includes("close")||text==="home"){closeDetails();return"Returning to the command deck."}
 if(/hello|hey aqua|good morning|good afternoon/.test(text))return"Hello Dave. I am ready. Ask me to open a command card, summarize it, or check its information.";
 return`I heard you, Dave. I can open and summarize any command card, rotate the carousel, or check the current demonstration information.`;
}
window.receiveAquaText=text=>{setState("idle");showTranscript(`You: ${text}`,true);speak(commandResponse(String(text)))};
window.receiveAquaPartial=text=>showTranscript(`You: ${text}`,true);
window.receiveAquaError=message=>{setState("idle");showTranscript(message)};
window.setAquaSpeaking=speaking=>setState(speaking?"speaking":"idle");
function startVoice(){setState("listening");showTranscript("Aqua is listening…",true);if(window.AquaBridge?.startListening){window.AquaBridge.startListening();return}const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;if(!Recognition){setState("idle");speak("Voice recognition is available in the Android APK. The cards and information checks work here by touch.");return}localRecognition?.abort();localRecognition=new Recognition();localRecognition.lang="en-US";localRecognition.interimResults=true;localRecognition.onresult=e=>{const r=e.results[e.results.length-1],text=r[0].transcript;r.isFinal?window.receiveAquaText(text):window.receiveAquaPartial(text)};localRecognition.onerror=()=>window.receiveAquaError("I could not hear that. Tap Aqua and try again.");localRecognition.onend=()=>{if(sentinel.classList.contains("state-listening"))setState("idle")};localRecognition.start()}
voiceButton.onclick=startVoice;askAqua.onclick=startVoice;previousCard.onclick=()=>rotate(-1);nextCard.onclick=()=>rotate(1);budgetPanel.onclick=()=>openCard(2);riskPanel.onclick=()=>openCard(4);closeSheet.onclick=closeDetails;checkInformation.onclick=checkCurrent;toggleDepthButton.onclick=()=>openCard(active,sheetState==="full"?"half":"full");
document.querySelectorAll(".bottom-rail button").forEach(button=>button.onclick=()=>{document.querySelectorAll(".bottom-rail button").forEach(b=>b.classList.remove("active"));button.classList.add("active");speak(`${button.dataset.label} selected.`)});
document.querySelector(".carousel-shell").onpointerdown=e=>dragX=e.clientX;document.querySelector(".carousel-shell").onpointerup=e=>{if(dragX!==null&&Math.abs(e.clientX-dragX)>28)rotate(e.clientX<dragX?1:-1);dragX=null};
renderCards();
