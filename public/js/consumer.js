let modalFullNameConsumer = document.getElementById("modalFullNameConsumer");
let modalTelephoneConsumer = document.getElementById("modalTelephoneConsumer");
let modalAddressConsumer = document.getElementById("modalAddressConsumer");
let modalIdConsumer = document.getElementById("modalIdConsumer");

let urlGetConsumer = `${hostname}/GetConsumer`;
let urlGetConsumerById = `${hostname}/GetConsumerById`;
let urlGetConsumerByName = `${hostname}/GetConsumerByName`;
let urlInsertConsumer = `${hostname}/InsertConsumer`;
let urlUpdateConsumer = `${hostname}/UpdateConsumer`;
let urlDeleteConsumer = `${hostname}/DeleteConsumer`;

lbConsumerId.addEventListener("click", function (e) {
  rowStaff.style.display = "none";
  rowConsumer.style.display = "flex";

  $("#Model").modal("show");
  SetEmptyConsumer();
  GetComsumer();
});

function GetComsumer() {
  axios
    .get(urlGetConsumer)
    .then((res) => {
      createOptionsInStaffAndConsumerSelectBox(
        res.data,
        "listModalFullNameConsumer"
      );
      createOptionsInStaffAndConsumerSelectBox(res.data, "listConsumerId");
    })
    .catch((err) => console.log(err));
}

function SetEmptyConsumer() {
  modalFullNameConsumer.value = "";
  modalTelephoneConsumer.value = "";
  modalAddressConsumer.value = "";
  modalIdConsumer.value = "";
}

function GetConsumerById(name) {
  let url = `${urlGetConsumerByName}/${name}`;

  axios
    .get(url)
    .then((res) => {
      if (res.data.length > 0) {
        modalFullNameConsumer.value = fillDataIntoInputTag(
          res.data[0].FullName
        );
        modalTelephoneConsumer.value = fillDataIntoInputTag(
          res.data[0].Telephone
        );
        modalAddressConsumer.value = fillDataIntoInputTag(res.data[0].Adrress);
        modalIdConsumer.value = fillDataIntoInputTag(res.data[0]._id);
      }
    })
    .catch((err) => console.log(err));
}

function modalFullNameConsumerChanged(e) {
  GetConsumerById(e.value);
}

function insertConsumer(e) {
  if (
    modalFullNameConsumer.value == null ||
    modalFullNameConsumer.value == undefined ||
    modalFullNameConsumer.value.trim() == ""
  ) {
    swal("Lỗi", "Chưa có họ tên", "error");
  } else {
    let url = `${urlInsertConsumer}/${CreateDataNullForPost(
      modalFullNameConsumer.value
    )}/${CreateDataNullForPost(
      modalTelephoneConsumer.value
    )}/${CreateDataNullForPost(
      modalAddressConsumer.value.replaceAll("/", "_")
    )}`;

    axios
      .post(url)
      .then((res) => {
        if (res.data != 0) {
          swal("Thành công", "Thêm thành công", "success");
          modalIdConsumer.value = res.data;
          GetComsumer();
        } else {
          swal("Lỗi", "Thêm không thành công", "error");
        }
      })
      .catch((err) => console.log(err));
  }
}

function updateConsumer(e) {
  if (
    modalFullNameConsumer.value == null ||
    modalFullNameConsumer.value == undefined ||
    modalFullNameConsumer.value.trim() == ""
  ) {
    swal("Lỗi", "Chưa có họ tên", "error");
  } else {
    let url = `${urlUpdateConsumer}/${CreateDataNullForPost(
      lbIdConsumer.value
    )}/${CreateDataNullForPost(
      modalFullNameConsumer.value
    )}/${CreateDataNullForPost(
      modalTelephoneConsumer.value
    )}/${CreateDataNullForPost(
      modalAddressConsumer.value.replaceAll("/", "_")
    )}`;

    axios
      .post(url)
      .then((res) => {
        if (res.data != 0) {
          swal("Thành công", "Cập nhật thành công", "success");
          GetComsumer();
        } else {
          swal("Lỗi", "Cập nhật không thành công", "error");
        }
      })
      .catch((err) => console.log(err));
  }
}

function deleteConsumer(e) {
  if (
    modalFullNameConsumer.value == null ||
    modalFullNameConsumer.value == undefined ||
    modalFullNameConsumer.value.trim() == ""
  ) {
    swal("Lỗi", "Chưa có họ tên", "error");
  } else {
    let url = `${urlDeleteConsumer}/${CreateDataNullForPost(
      modalIdConsumer.value
    )}`;

    axios
      .post(url)
      .then((res) => {
        if (res.data != 0) {
          swal("Thành công", "Xóa thành công", "success");
          SetEmptyConsumer();
          GetComsumer();
        } else {
          swal("Lỗi", "Xóa không thành công", "error");
        }
      })
      .catch((err) => console.log(err));
  }
}
