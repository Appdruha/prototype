import { Body, Controller, Get, Post } from '@nestjs/common'
import { requests } from './requests'
import { RequestData } from './Request-data'
import { request } from 'express'

@Controller('/api')
export class AppController {
  @Get('/')
  getRequests() {
    return requests
  }

  @Post('/create')
  createRequest(@Body() requestData: RequestData) {
    if (requests.find((request) => requestData.requestNumber === request.requestNumber)) {
      return requests
    }
    requests.push(requestData)
    return requests
  }

  @Post('/update')
  updateRequest(@Body() requestData: RequestData) {
    requests.forEach((request) => {
      if (request.requestNumber === requestData.requestNumber) {
        Object.assign(request, requestData)
      }
    })
    return requests
  }
}
