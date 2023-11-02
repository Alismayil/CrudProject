const baseUrl = "http://localhost:3000/products";
const dataTable = document.getElementById("data-table");

// fetch func started
async function fetchData() {
  const response = await axios.get(baseUrl);
  addTable(response.data);
}

// add func started

function addTable(data) {
  dataTable.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td >${item.position}</td>
        <td class="action">
            <button onclick="editPost(${item.id})" class='btn'>EDIT</button>
            <button onclick="deletePost(${item.id})" class='btn2'>DELETE</button>
            <input type="checkbox">
        </td>
        `;
    dataTable.appendChild(row);
  });
}

// creat func started
async function creatPost() {
  const nameInput = document.getElementById("name-input").value;
  const positionInput = document.getElementById("pos-input").value;
  try {
    const response = await axios.post(baseUrl, {
      name: nameInput,
      position: positionInput,
    });
    fetchData();
  } catch (error) {
    console.log(error);
  }
}

// update func started
async function updatePost() {
    const nameInput=document.getElementById('name-input').value
    const positionInput=document.getElementById('pos-input').value
    if (editPostId) {
       try {
        await axios.put(`${baseUrl}/${editPostId}`,{
            name:nameInput,
            position: positionInput
        })
       } catch (error) {
    console.log(error);
        
       }
        
    }
    
}

// edit func started
let editPostId=null
async function editPost(postId) {
    try {
        const response=await axios.get(`${baseUrl}/${postId}`)    
        const post=response.data
        document.getElementById('name-input').value=post.name
        document.getElementById('pos-input').value=post.position

        editPostId=postId
} catch (error) {
    console.log(error);
    
}    
}

// delete func started
async function deletePost(postId) {
  try {
    await axios.delete(`${baseUrl}/${postId}`)

  } catch (error) {
    console.log(error);
  }
}

fetchData();
