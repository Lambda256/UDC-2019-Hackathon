package com.example.ssafy_book;

public class CardViewItem {

    int image, boardId;
    String title;
    String state;

    int getImage(){
        return this.image;
    }

    String getTitle(){
        return this.title;
    }

    String getState(){
        return this.state;
    }

    int getBoardId(){
        return this.boardId;
    }
    CardViewItem(int book, String s, int boardId){
        this.image=book;
        this.title = s;
        this.boardId = boardId;
    }

    CardViewItem(int book, String title, String state, int boardId){
        this.image = book;
        this.title = title;
        this.state = state;
        this.boardId = boardId;
    }
}
