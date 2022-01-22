let myLeads=[]
const inputEl=document.getElementById("input-el")
const saveEl=document.getElementById("input-btn")
const saveTabEl=document.getElementById("save-tab-btn")
const ulEl=document.getElementById("ul-el")
const delEl=document.getElementById("delete-btn")
const leadsFromLocal=JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocal)
{
    myLeads=leadsFromLocal
    render(myLeads)
}
saveTabEl.addEventListener("click",function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) 
    {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})
delEl.addEventListener("dblclick",function(){
    localStorage.clear("myLeads")
    myLeads=[]
    render(myLeads)
})
saveEl.addEventListener("click",function(){
    if(inputEl.value)
    {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    }
    inputEl.value=''
    render(myLeads)
})

function render(leads)
{
    listItems=""
    for(i=0;i<leads.length;i++)
    {
        // listItems+="<li><a href='"+myLeads[i]+"' target='_blank'>"+myLeads[i]+"</a></li>"
        listItems+=`<li>
                <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
                </li>`
    }
    ulEl.innerHTML=listItems
}
