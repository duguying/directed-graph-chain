/**
 * Copyright 2017-2020 Rex Lee
 *
 * THIS FILE IS PART OF  PROJECT
 * ALL COPYRIGHT RESERVED
 *
 * Created by duguying on 2018/5/25.
 */

export default class ArrayList {
    private list : Object[] = [];

    public Add (e : Object) {
        this.list.push(e)
    }

    public Get (i : number) : Object {
        return this.list[i];
    }

    public Set (i : number, e : Object) {
        this.list[i] = e
    }

    public IsEmpty() : boolean {
        return 0 == this.list.length
    }

    public Clear() {
        this.list = []
    }

    public Remove(i : number) {
        this.list.splice(i)
    }

    public Contains(e : Object) : boolean {
        return this.list.indexOf(e) > -1
    }
}