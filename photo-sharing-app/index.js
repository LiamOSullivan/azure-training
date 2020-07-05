#!/usr/bin/env node
require('dotenv').config()
const util = require('util')
const storage = require('azure-storage')

const containerName = 'photoblobs'

const blobService = storage.createBlobService()
const createContainerAsync = util.promisify(blobService.createContainerIfNotExists).bind(blobService)
// const uploadBlobAsync = util.promisify(blobService.createBlockBlobFromLocalFile).bind(blobService)

async function main () {
  try {
    // This makes an actual service call to the Azure Storage service.
    // Unless this call fails, the container will have been created.
    const creationResult = await createContainerAsync(containerName)

    if (creationResult.created) {
      console.log(`conatiner ${containerName} created`)
    } else {
      console.log(`conatiner ${containerName} already exists`)
    }
    // This transfers data in the file to the blob on the service.
    // let uploadResult = await uploadBlobAsync(containerName, 'myphoto', 'photo.png')
    // if (uploadResult.created) {
    //   console.log('blob uploaded')
    // } else {
    //   console.log('blob already exists')
    // }
  } catch (err) {
    console.log(err.message)
  }
}

main()
