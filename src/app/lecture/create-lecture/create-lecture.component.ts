import { Component } from '@angular/core';

import DragDrop from 'editorjs-drag-drop';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Embed from '@editorjs/embed';
import Table from 'editorjs-table';
import Underline from '@editorjs/underline';
import AttachesTool from '@editorjs/attaches';
import Quote from '@editorjs/quote';
import Link from '@editorjs/link';
import Checklist from '@editorjs/checklist';
import Marker from '@editorjs/marker';
import CodeTool from '@editorjs/code';
import Warning from '@editorjs/warning';
import List from '@editorjs/list';
import SimpleImage from '@editorjs/simple-image';
import Delimiter from '@editorjs/delimiter';

@Component({
  selector: 'app-create-lecture',
  templateUrl: './create-lecture.component.html',
  styleUrls: ['./create-lecture.component.css'],
})
export class CreateLectureComponent {
  editor = new EditorJS({
    onReady: () => {
      new DragDrop(this.editor);
    },
    holder: 'editor-js',
    autofocus: true,
    tools: {
      header: Header,
      link: Link,
      delimiter: Delimiter,
      underline: Underline,
      warning: { class: Warning, inlineToolbar: true },
      image: SimpleImage,
      list: {
        class: List,
        inlineToolbar: true,
      },
      Marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
      },
      code: CodeTool,
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      embed: {
        class: Embed,
        inlineToolbar: true,
        config: {
          services: {
            youtube: true,
            instagram: true,
          },
        },
      },
      table: {
        class: Table,
        inlineToolbar: true,
      },
      attaches: {
        class: AttachesTool,
        config: {
          endpoint: 'http://localhost:4200/assets/',
        },
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+O',
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: "Quote's author",
        },
      },
    },
  });
  output!: object;
  constructor() {}
  ngOnInit() {}

  generate() {
    this.editor
      .save()
      .then((outputData) => {
        this.output = outputData.blocks;
      })
      .catch((error) => {
        console.log('Saving failed: ', error);
      });
  }
}