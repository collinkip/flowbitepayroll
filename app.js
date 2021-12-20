const modelWrapper=document.querySelector('.model-wrapper');
const addModel=document.querySelector('.add-model');
const btnAdd= document.querySelector('.btn-add');
const addModalForm=document.querySelector('.add-model form');

//show add diaolog box
btnAdd.addEventListener('click',()=>{
    addModel.classList.add('modal-show');
});

//onclick outside window
window.addEventListener('click',e=>{
    if(e.target===addModel){
        addModel.remove('modal-show');

    }
});
const tableUsers=document.querySelector('.table-users')
//render data on web


const renderUser=(doc)=>{
    const tr=`
    <tr>
        <td>${doc.data().fullName}</td>
        <td>${doc.data().department}</td>
        <td>${doc.data().email}</td>
        <td>${doc.data().phone}</td>
        <td>
            <button class="btn btn-edit">Edit</button>
            <button class="btn btn-delete">Delete</button>

        </td>
    </tr>
    `;

    console.log(doc.id);
    tableUsers.insertAdjacentHTML('beforeend',tr);


    //click delete
    const btnDelete=document.querySelector('.btn-delete');
    btnDelete.addEventListener('click',()=>{
        console.log('user deleted')
    })

}

//show data on console
db.collection('users').get().then(querySnapshot=>{
    querySnapshot.forEach(doc=>{
        console.log(doc.data());
        renderUser(doc);

    })

});

//click submit to  add model
addModalForm.addEventListener('submit',e =>{
    e.preventDefault();
    console.log(addModalForm.fullname.value)
    db.collection('users').add({
        fullName:addModalForm.fullname.value,
        department:addModalForm.department.value,
        email:addModalForm.Email.value,
        phone:addModalForm.phone.value
    })

})