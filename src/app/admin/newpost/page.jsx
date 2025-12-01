"use client"
import React, { useEffect } from 'react'
import Editor from '../component/Editor'
import axios, * as others from 'axios';

export default function page() {
  return (
    <div>
        <Editor></Editor>
    </div>
  )
}