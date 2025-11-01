import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, RotateCcw } from 'lucide-react';

export const RED = '#ef4444';
export const BLACK = '#1f2937';

export default class RBNode {
  constructor(value) {
    this.value = value;
    this.color = RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}