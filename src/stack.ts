/**
 * Copyright 2017-2020 Rex Lee
 *
 * THIS FILE IS PART OF  PROJECT
 * ALL COPYRIGHT RESERVED
 *
 * Created by duguying on 2018/5/25.
 */

export default class Stack {
    private list : Object[] = [];

    public Push(value : Object) {
        this.list.push(value);
    }

    public Pop() : Object {
        return this.list.pop();
    }

    public Peak() : Object {
        let item = this.list.pop();
        this.list.push(item);
        return item;
    }

    public Len() : number {
        return this.list.length
    }

    public Empty() : boolean {
        return this.list.length == 0
    }

    public Contains(e : Object) : boolean {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i] === e) {
                return true
            }
        }
        return false
    }

    public AsChain() : Object[] {
        return this.list
    }
}