let userName = document.getElementById("userName2");
let password = document.getElementById("password");
let email = document.getElementById("email");
let role = document.getElementById("role");
let staffId = document.getElementById("staffId");
let consumerId = document.getElementById("consumerId");
let id = document.getElementById("id");

let btnInsert = document.getElementById("btnInsert");
let btnUpdate = document.getElementById("btnUpdate");
let btnDelete = document.getElementById("btnDelete");

let urlGetRole = `${hostname}/GetRole`;
let urlGetUser = `${hostname}/GetUser`;
let urlGetUserById = `${hostname}/GetUserById`;
let urlGetUserByUserName = `${hostname}/GetUserByUserName`;
let urlCheckExistsUserName = `${hostname}/CheckExistsUserName`;
let urlInsertUser = `${hostname}/InsertUser`;
let urlUpdateUser = `${hostname}/UpdateUser`;
let urlDeleteUser = `${hostname}/DeleteUser`;

function GetRole() {
  axios
    .get(urlGetRole)
    .then((res) => {
      createOptionsInRoleSelectBox(res.data, "listRole");
    })
    .catch((err) => console.log(err));
}

function GetUser() {
  axios
    .get(urlGetUser)
    .then((res) => {
      createOptionsInUserNameSelectBox(res.data, "listUser");
    })
    .catch((err) => console.log(err));
}

function GetUserNameById(name) {
  let url = `${urlGetUserByUserName}/${name}`;

  axios
    .get(url)
    .then((res) => {
      if (res.data.length > 0) {
        userName.value = fillDataIntoInputTag(res.data[0].Username);
        //password.value = fillDataIntoInputTag(res.data[0].Password);
        email.value = fillDataIntoInputTag(res.data[0].Email);
        role.value = fillDataIntoInputTag(res.data[0].Role);
        staffId.value = fillDataIntoInputTag(res.data[0].StaffId);
        consumerId.value = fillDataIntoInputTag(res.data[0].ConsumerId);
        id.value = fillDataIntoInputTag(res.data[0]._id);
      }
    })
    .catch((err) => console.log(err));
}

async function CheckExistsUserName(name) {
  let url = `${urlGetUserByUserName}/${name}`;
  let result = await axios.get(url);

  if (result.data.length > 0) {
    swal("Lỗi", "Tên đăng nhập đã có", "error");
    return 0;
  } else {
    return 1;
  }
}

function SetEmptyUser() {
  userName.value = "";
  password.value = "";
  email.value = "";
  role.value = "";
  staffId.value = "";
  consumerId.value = "";
  id.value = "";
}

GetUser();
GetRole();
GetStaff();
GetComsumer();

userName.addEventListener("change", function (e) {
  GetUserNameById(e.target.value);
});

btnInsert.addEventListener("click", async function (e) {
  if (
    userName.value == null ||
    userName.value == undefined ||
    userName.value.trim() == ""
  ) {
    swal("Lỗi", "Chưa có tên đăng nhập", "error");
  } else if (
    password.value == null ||
    password.value == undefined ||
    password.value.trim() == ""
  ) {
    swal("Lỗi", "Chưa có mật khẩu", "error");
  } else {
    if ((await CheckExistsUserName(userName.value)) > 0) {
      let url = `${urlInsertUser}/${CreateDataNullForPost(
        userName.value
      )}/${CreateDataNullForPost(password.value)}/${CreateDataNullForPost(
        email.value
      )}/${CreateDataNullForPost(consumerId.value)}/${CreateDataNullForPost(
        staffId.value
      )}/${CreateDataNullForPost(role.value)}`;

      axios
        .post(url)
        .then((res) => {
          if (res.data != 0) {
            swal("Thành công", "Thêm thành công", "success");
            id.value = res.data;
            GetUser();
          } else {
            swal("Lỗi", "Thêm không thành công", "error");
          }
        })
        .catch((err) => console.log(err));
    }
  }
});

btnUpdate.addEventListener("click", function (e) {
  if (
    userName.value == null ||
    userName.value == undefined ||
    userName.value.trim() == ""
  ) {
    swal("Lỗi", "Chưa có tên đăng nhập", "error");
  } else if (
    password.value == null ||
    password.value == undefined ||
    password.value.trim() == ""
  ) {
    swal("Lỗi", "Chưa có mật khẩu", "error");
  } else {
    let url = `${urlUpdateUser}/${CreateDataNullForPost(
      id.value
    )}/${CreateDataNullForPost(userName.value)}/${CreateDataNullForPost(
      password.value
    )}/${CreateDataNullForPost(email.value)}/${CreateDataNullForPost(
      consumerId.value
    )}/${CreateDataNullForPost(staffId.value)}/${CreateDataNullForPost(
      role.value
    )}`;

    axios
      .post(url)
      .then((res) => {
        if (res.data != 0) {
          swal("Thành công", "Cập nhật thành công", "success");
          GetUser();
        } else {
          swal("Lỗi", "Cập nhật không thành công", "error");
        }
      })
      .catch((err) => console.log(err));
  }
});

btnDelete.addEventListener("click", function (e) {
  if (
    userName.value == null ||
    userName.value == undefined ||
    userName.value.trim() == ""
  ) {
    swal("Lỗi", "Chưa có tên đăng nhập", "error");
  } else {
    let url = `${urlDeleteUser}/${CreateDataNullForPost(id.value)}`;
    axios
      .post(url)
      .then((res) => {
        if (res.data != 0) {
          swal("Thành công", "Xóa thành công", "success");
          SetEmptyUser();
          GetUser();
        } else {
          swal("Lỗi", "Xóa không thành công", "error");
        }
      })
      .catch((err) => console.log(err));
  }
});
