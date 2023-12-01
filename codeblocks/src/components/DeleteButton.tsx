"use client"
import React from 'react'

import { deleteBlock } from '@/library/server-actions';

interface DeleteButtonProps {
  id: number;
}

export default function DeleteButton({ id }: DeleteButtonProps) {

    return (
      <button onClick={() => deleteBlock(id)} style={{ color: '#66fcf1' }}>Delete</button>
    )
}
