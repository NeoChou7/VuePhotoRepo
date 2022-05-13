import env from '../config/env'

const serverHostPath = env.serverHostPath
function wsGetImages (fromName) {
  const imagesPath =
      serverHostPath + '/images?fromName=' + (fromName || '')
  return fetch(imagesPath).then(function (response) {
    return response.json()
  })
}

function wsDeleteImages (names) {
  const deletePath = this.$serverHostPath + '/delete'

  return fetch(deletePath, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'DELETE',
    body: JSON.stringify(names)
  }).then(function (response) {
    return response.json()
  })
}

function wsGetImage (imgName) {
  const imagePath = this.$serverHostPath + '/image/' + imgName
  return fetch(imagePath)
    .then(function (response) {
      return response.arrayBuffer()
      //   return response.formData();
    })
    .then(function (buffer) {
      var base64Flag = 'data:image/jpeg;base64,'
      var imageStr = arrayBufferToBase64(buffer)
      return base64Flag + imageStr
      // document.getElementById("img").src = base64Flag + imageStr;
    })
}

function wsGetXSImage (imgName) {
  const imagePath = this.$serverHostPath + '/image-xs/' + imgName
  return fetch(imagePath)
    .then(function (response) {
      return response.arrayBuffer()
      //   return response.formData();
    })
    .then(function (buffer) {
      var base64Flag = 'data:image/jpeg;base64,'
      var imageStr = arrayBufferToBase64(buffer)
      return base64Flag + imageStr
    })
}

function arrayBufferToBase64 (buffer) {
  var binary = ''
  var bytes = [].slice.call(new Uint8Array(buffer))

  bytes.forEach((b) => (binary += String.fromCharCode(b)))

  return window.btoa(binary)
}

function wsFileUpload (files) {
  var data = new FormData()
  Array.from(files).forEach((name) => data.append('files', name))
  // data.append("files", file);
  const uploadPath = this.$serverHostPath + '/upload'
  return fetch(uploadPath, {
    method: 'POST',
    body: data
  }).then(function (response) {
    return response.json()
  })
}

export default {wsGetImages, wsGetImage, wsGetXSImage, wsFileUpload, wsDeleteImages}
