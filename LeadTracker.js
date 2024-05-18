let myLeads = []
const textEL = document.getElementById("text-ele")
const saveBtn = document.getElementById("save-btn")
const ulEL = document.getElementById("ul")
const deleteBtn = document.getElementById("delete-btn")
let saveTabBtn = document.getElementById("savetab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLocalStorage)
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderData()
}
saveBtn.addEventListener("click",function(){
    
    myLeads.push(textEL.value)
    textEL.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderData()
})
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    renderData()
})
saveTabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderData()
    })
})
function renderData(){
   let listContent = ""
        for(let i = 0; i < myLeads.length; i++){
            // myLeads = JSON.parse(localStorage.getItem(myLeads))
            listContent +=`
             <li>
               <a href=${myLeads[i]} target="_blank">${myLeads[i]}
               </a>
            </li>`
        }
        ulEL.innerHTML = listContent
}