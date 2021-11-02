/* COUNTDOWN */
var countDownDate = new Date("Dec 5, 2021 12:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("countdown-days").innerHTML = days + " days";
  document.getElementById("countdown-hours").innerHTML = hours + " hours";
  document.getElementById("countdown-minutes").innerHTML = minutes + " minutes";
  document.getElementById("countdown-seconds").innerHTML = seconds + " seconds";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown-days").innerHTML = "EXPIRED";
    document.getElementById("countdown-hours").innerHTML = "EXPIRED";
  	document.getElementById("countdown-minutes").innerHTML = "EXPIRED";
  	document.getElementById("countdown-seconds").innerHTML = "EXPIRED";
  }
}, 1000);

// Check Validation
function Validator(options) {

  var selectorRules = {};
  
  function validate(inputElement, rule) {
      //Ham thuc hien validate
      var errorMessage;
      var errorElemnt = inputElement.parentElement.querySelector(options.errorSelector)
  
      // Lấy ra các rules của selector
      var rules = selectorRules[rule.selector]

      //Lặp qua từng rule & kiểm tra
      //Nếu lỗi thì dừng việc kiểm tra
      for(var i = 0; i < rules.length; ++i) {
          errorMessage = rules[i](inputElement.value);
          if (errorMessage) break;
      }

      if (errorMessage) {
          errorElemnt.innerHTML = errorMessage;
          inputElement.parentElement.classList.add('invalid')
      } else {
          errorElemnt.innerHTML = '';
          inputElement.parentElement.classList.remove('invalid')
      }
      return !errorMessage;
  }
  
  // Lay element cua form can validate
  var formElement = document.querySelector(options.form)
      
  if (formElement) {
      //Khi submit form
      formElement.onsubmit = function(e) {
          e.preventDefault();

          var isFormValid = true;

          //lặp qua từng rule và validate
          options.rules.forEach(function(rule) {
              var inputElement = formElement.querySelector(rule.selector)
              var isValid = validate(inputElement, rule);
              if (!isValid) {
                  isFormValid = false;
              }
          });

          console.log(formValues);

          if (isFormValid) {
              // Trường hợp submit với javascript
              if (typeof options.onSubmit === 'function') {

                  var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')
          
                  var formValues = Array.from(enableInputs).reduce(function (values, input) {
                      return (values[input.name] = input.value) && values;
                  }, {});

                  options.onSubmit(formValues)
              }
              // Trường hợp submit với hành vì mặc định
              else {
                  formElement.onSubmit();
              }
          }
          
      }

      //Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ..)
      options.rules.forEach(function (rule) {

          //Lưu lại các rules cho mỗi input
          if (Array.isArray(selectorRules[rule.selector])) {
              selectorRules[rule.selector].push(rule.test)
          } else {
              selectorRules[rule.selector] = [rule.test]
          }


          var inputElement = formElement.querySelector(rule.selector)
          
          if (inputElement) {
              //Xử lí trường họp blur khỏi input
              inputElement.onblur = function () {
                  // value : inputElement.value
                  // test func : rule.test
                  validate(inputElement, rule)
              }
              
              //Xử lí mỗi khi người dùng nhập vào input
              inputElement.oninput = function () {
                  var errorElemnt = inputElement.parentElement.querySelector('.form-message')
                  errorElemnt.innerHTML = '';
                  inputElement.parentElement.classList.remove('invalid')
              }
          }
          
      })
      
  }
}

// Định nghĩa rules
// Nguyên tắc các rule:
// 1. Khi có lỗi => trả ra message lỗi
// 2.khi hợp lệ => kg trả ra cái gì cả(undefined)
Validator.isRequired = function (selector, message) {
  return {
      selector : selector,
      test: function (value) {
          return value.trim() ? undefined : message || "Vui lòng điền vào ô trống";
      }
  }
}

Validator.isEmail = function (selector, message) {
  return {
      selector : selector,
      test: function (value) {
          var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return regex.test(value) ? undefined : message || "Vui lòng nhập email";
      }
  }
}

Validator.minLength = function (selector, min, message) {
  return {
      selector : selector,
      test: function (value) {
          return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
      }
  }
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
      selector : selector,
      test: function (value) {
          return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính sác'
      }
  }
}

/* CHOOSE COLOR */
var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

var colors = $$('.option-color__pro')
        
var colorChosen = $('.option-color__pro.option-color-selected')

colors.forEach((color) => {
    color.onclick = () => {
        $('.option-color__pro.option-color-selected').classList.remove('option-color-selected');

        color.classList.add('option-color-selected')
    }
})


/* QUANTITY-PRODUCT */
let deductBtnArr = document.getElementsByClassName('minus1');
let addButtonArr = document.getElementsByClassName('add1');

for(let deductBtn of deductBtnArr){
    deductBtn.onclick = function(){
        let currentInputBox = deductBtn.nextElementSibling;
        currentInputBox.value =  currentInputBox.value - 1;
    }
}

for(let addButton of addButtonArr){
    addButton.onclick = () => {
        let currentInputBox = addButton.previousElementSibling;
        currentInputBox.value =  parseInt(currentInputBox.value) + 1;
    }
}
