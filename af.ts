/**
 * Copyright 2017-2020 Rex Lee
 *
 * THIS FILE IS PART OF  PROJECT
 * ALL COPYRIGHT RESERVED
 *
 * Created by duguying on 2018/5/25.
 */
import Graph from "./graph";
import Stack from "./stack";
import ArrayList from "./arraylist";

interface Result {
    af : boolean
    chains : string[][]
}

export default class Af {
    private isAf : boolean = false;
    private g : Graph = new Graph();
    private n : number = 0;
    private start : number = 0;
    private end : number = 0;

    private finalChains : string[][] = [];
    private theStack : Stack = new Stack();

    private tempList : ArrayList = new ArrayList();
    private counterExample : string = "";

    public GetResult() : Result {
        this.n = this.g.GetN();
        this.theStack = new Stack();

        if (!this.isConnectable(this.start, this.end)) {
            this.isAf = false;
            this.counterExample = "节点之间没有通路"
        }else {
            for (let j = 0; j < this.n; j++) {
                this.tempList = new ArrayList();
                for (let i = 0; i < this.n; i++) {
                    this.tempList.Add(0)
                }
                this.g.GetVertexList()[j].SetAllVisitedList(this.tempList)
            }
            this.isAf = this.af(this.start, this.end)
        }
        return {af : this.isAf, chains: this.finalChains}
    }

    private af(start : number, end : number) : boolean {
        this.g.GetVertexList()[start].SetWasVisited(true);
        this.theStack.Push(start);

        for(;!this.theStack.Empty();){
            let v = this.getAdjUnvisitedVertex(<number>this.theStack.Peak());
            if (v == -1) {
                this.tempList = new ArrayList();
                for (let j = 0; j < this.n; j++) {
                    this.tempList.Add(0);
                }
                this.g.GetVertexList()[<number>this.theStack.Peak()].SetAllVisitedList(this.tempList);
                this.theStack.Pop();
            }else {
                this.theStack.Push(v);
            }

            if (!this.theStack.Empty() && end == this.theStack.Peak()) {
                this.g.GetVertexList()[end].SetWasVisited(false);
                this.finalChains.push(this.asChain());
                this.theStack.Pop();
            }
        }

        return this.isAf
    }

    private isConnectable(start : number, end : number) : boolean {
        let queue = new ArrayList();
        let visited = new ArrayList();
        queue.Add(start);
        for(;!queue.IsEmpty();){
            for (let j = 0; j < this.n; j++) {
                if (this.g.GetAdjMatrix()[start][j]==-1 && !visited.Contains(j)){
                    queue.Add(j)
                }
            }
            if (queue.Contains(end)) {
                return true;
            }else {
                visited.Add(queue.Get(0));
                queue.Remove(0);
                if (!queue.IsEmpty()) {
                    start = <number>queue.Get(0);
                }
            }
        }
        return false;
    }

    private getAdjUnvisitedVertex(v : number) : number {
        let al = this.g.GetVertexList()[v].GetAllVisitedList();
        for (let j = 0; j < this.n; j++) {
            if (this.g.GetAdjMatrix()[v][j] == 1 && (<number>al.Get(j)) == 0 && !this.theStack.Contains(j)) {
                this.g.GetVertexList()[v].SetVisited(j);
                return j;
            }
        }
        return -1;
    }

    private printTheStack(){
        let c = "";
        let chain = this.theStack.AsChain();
        for (let idx = 0; idx < chain.length; idx++) {
            let value = chain[idx];
            c = c + `${this.g.GetVertexList()[<number>value].label}`
            if (chain.length - 1 != idx) {
                c = c + "-->"
            }
        }
        c = c + "\n";
        console.log(c)
    }

    private asChain() : string[] {
        let c : string[] = [];
        let chain = this.theStack.AsChain();
        for (let i = 0; i < chain.length; i++) {
            let value = chain[i];
            c.push(this.g.GetVertexList()[<number>value].label)
        }
        return c
    }

    public static New(graph : Graph, start : number, end : number) : Af {
        let af = new Af();
        af.g = graph;
        af.start = start;
        af.end = end;
        return af;
    }
}