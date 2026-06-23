import { getEncoding } from 'js-tiktoken'
// decode 解码  Encode 编码
// gpt 官方的token编码器 cl100k_base
// utf-8 编码
const enc = getEncoding('cl100k_base')