const modelWrapper=document.querySelector('.model-wrapper');
const addModel=document.querySelector('.add-model');
const addModalForm=document.querySelector('.add-model form');


const editModel=document.querySelector('.edit-model');
const editModalForm=document.querySelector('.edit-model form');

const btnAdd= document.querySelector('.btn-add');


let id;
//show add diaolog box
btnAdd.addEventListener('click',()=>{
    addModel.classList.add('modal-show');
    
});

//onclick outside window
window.addEventListener('click',e=>{
    if(e.target===addModel){
        addModel.remove('modal-show');
    }
    if(e.target===editModel){
        editModel.remove('modal-show');
    }
});
const tableUsers=document.querySelector('.table-users')






//render data on web


const renderUser=(doc)=>{
    const tr=`
    <tr data-id ='${doc.id}'>
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





    //render edit dilog box
    const btnEddit=document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
    btnEddit.addEventListener('click',()=>{
        editModel.classList.add('modal-show');

        id=doc.id;
        editModalForm.fullname.value=doc.data().fullName;
        editModalForm.department.value=doc.data().department;
        editModalForm.Email.value=doc.data().email;
        editModalForm.phone.value=doc.data().phone;
        
    });
    
    

    //click delete
    const btnDelete=document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
    btnDelete.addEventListener('click',()=>{
        db.collection('users').doc(`${doc.id}`).delete().then(()=>{
            console.log('Record deleted');
        }).catch(err=>{
            console.log('Error removing document')
        });
    });

}

//render user
// db.collection('users').get().then(querySnapshot=>{
//     querySnapshot.forEach(doc=>{
//         // console.log(doc.data());
//         renderUser(doc);

//     })

// });

//realtime listerner
db.collection('users').onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(change=>{
        console.log(change.type)
        if(change.type==='added'){
            renderUser(change.doc);
        }
        if(change.type==='removed'){
            let tr=document.querySelector(`[data-id='${change.doc.id}']`);
            let tbody=tr.parentElement;
            tableUsers.removeChild(tbody);
        }
        if(change.type==='modified'){
            let tr=document.querySelector(`[data-id='${change.doc.id}']`);
            let tbody=tr.parentElement;
            tableUsers.removeChild(tbody);
            renderUser(change.doc)
            
        }
    })

})


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
    addModel.remove('modal-show');

})

//click submit edit to firebase
editModalForm.addEventListener('submit',e=>{
    e.preventDefault();
    db.collection('users').doc(id).update({
        fullName:editModalForm.fullname.value,
        department:editModalForm.department.value,
        email:editModalForm.Email.value,
        phone:editModalForm.phone.value


    });
    editModel.remove('modal-show');
});
