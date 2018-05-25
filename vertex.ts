/**
 * Copyright 2017-2020 Rex Lee
 *
 * THIS FILE IS PART OF  PROJECT
 * ALL COPYRIGHT RESERVED
 *
 * Created by duguying on 2018/5/25.
 */

import ArrayList from "./arraylist";

export default class Vertex {
    private wasVisited : boolean = false;
    private allVisitedList : ArrayList = new ArrayList();
    public label : string = "";

    public SetAllVisitedList(allVisitedList : ArrayList) {
        this.allVisitedList = allVisitedList
    }

    public GetAllVisitedList() : ArrayList {
        return this.allVisitedList
    }

    public GetWasVisited() : boolean {
        return this.wasVisited
    }

    public SetWasVisited(wasVisited : boolean) {
        this.wasVisited = wasVisited
    }

    public GetLabel() : string {
        return this.label
    }

    public SetLabel(label : string) {
        this.label = label
    }

    public SetVisited(j : number) {
        this.allVisitedList.Set(j, 1)
    }

    public static New(lab : string) : Vertex {
        let v = new Vertex();
        v.label = lab;
        return v;
    }
}