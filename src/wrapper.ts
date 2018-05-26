/**
 * Copyright 2017-2020 Rex Lee
 *
 * THIS FILE IS PART OF  PROJECT
 * ALL COPYRIGHT RESERVED
 *
 * Created by duguying on 2018/5/25.
 */
import Graph from "./graph";
import Af from "./af";

export type Chain = string[];

export default class GraphNetwork {
    private g : Graph = new Graph();
    private labels : string[] = [];
    private relations : string[][] = []; // string[][2]

    public AddRelation(from : string, to : string) : GraphNetwork {
        this.relations.push([from,to]);
        if (!this.hasLabel(from)) {
            this.labels.push(from);
        }
        if (!this.hasLabel(to)) {
            this.labels.push(to);
        }
        return this
    }

    public Done() : GraphNetwork {
        this.g = Graph.NewGraph(this.labels.length);
        for (let i = 0; i < this.labels.length; i++) {
            let label = this.labels[i];
            this.g.AddVertex(label)
        }
        for (let i = 0; i < this.relations.length; i++) {
            let relation = this.relations[i];
            let from = this.getIdx(relation[0]);
            let to = this.getIdx(relation[1]);
            this.g.AddEdge(from, to)
        }
        return this
    }

    public GetGraph() : Graph {
        return this.g;
    }

    private getIdx(label : string) : number {
        for (let idx = 0; idx < this.labels.length; idx++) {
            let item = this.labels[idx];
            if (label == item) {
                return idx
            }
        }
        return -1;
    }

    private hasLabel(label : string) : boolean {
        return this.labels.indexOf(label) > -1
    }

    public GetChains(from : string, to : string) : Chain[] {
        let fromIdx = this.getIdx(from);
        let toIdx = this.getIdx(to);
        let af = Af.New(this.g,fromIdx,toIdx);
        let chains = af.GetResult();
        return this.loadAsChains(chains.chains);
    }

    private loadAsChains(rawChains : string[][]) : Chain[] {
        let ch : Chain[] = [];
        for (let i = 0; i < rawChains.length; i++) {
            let chain = rawChains[i];
            ch.push(<Chain>chain)
        }
        return ch;
    }

    public AddExtraVertex(label : string) : GraphNetwork {
        this.labels.push(label);
        return this
    }

    private getAllChains(to : string) : Chain[] {
        let chAll : Chain[] = [];
        for (let i = 0; i < this.labels.length; i++) {
            let searchFrom = this.labels[i];
            let ch = this.GetChains(searchFrom, to);
            chAll = chAll.concat(ch);
        }
        return chAll;
    }

    public GetAllChains(to : string) : Chain[] {
        let labelsTodo = this.labels;
        let orph = to;
        let chCollections : Chain[] = [];
        for (;labelsTodo.length>0;) {
            let chs = this.getAllChains(orph);

            chCollections = chCollections.concat(chs);
            let usedLabels = [to].concat(this.getChainsLabels(chs));

            labelsTodo = this.removeLabels(labelsTodo, usedLabels);

            if (labelsTodo.length > 0) {
                orph = labelsTodo[0];
            }
        }
        let chCollects : Chain[] = [];
        for (let i = 0; i < chCollections.length; i++) {
            let ch = chCollections[i];
            if ((<string[]>ch).length>1) {
                chCollects.push(ch);
            }
        }
        chCollects = this.filterExtraSubChain(chCollects);
        return chCollects;
    }

    private getChainsLabels(chains : Chain[]) : string[] {
        let lbs : string[] = [];
        for (let i = 0; i < chains.length; i++) {
            let chain = chains[i];
            for (let j = 0; j < (<string[]>chain).length; j++) {
                let label = chain[j];
                if (!this.labelContain(label, lbs)) {
                    lbs.push(label)
                }
            }
        }
        return lbs
    }

    private labelContain(label : string, labels : string[]) : boolean {
        for (let i = 0; i < labels.length; i++) {
            let lab = labels[i];
            if (lab == label) {
                return true;
            }
        }
        return false;
    }

    private removeLabels(labels : string[], labelsToRemove : string[]) : string[] {
        let lbs : string[] = [];
        for (let i = 0; i < labels.length; i++) {
            let label = labels[i];
            if (!this.labelContain(label, labelsToRemove)) {
                lbs.push(label)
            }
        }
        return lbs
    }

    private sort(chCollects : Chain[]) : Chain[] {
        let i, j : number;
        let arr : Chain[] = chCollects;
        let len : number = chCollects.length;
        let mid : Chain;
        for (i = 0; i < len - 1; i++) {
            for (j = 0; j < len - 1 - i; j++) {
                if (arr[j].length < arr[j + 1].length) {
                    mid = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = mid;
                }
            }
        }
        return arr;
    }

    private filterExtraSubChain(chCollects : Chain[]) : Chain[] {
        let ccls = this.sort(chCollects);
        let ccfo : string[] = [];
        for (let i = 0; i < ccls.length; i++) {
            for (let j = i + 1; j < ccls.length; j++) {
                let str:string = (ccls[i].join(""));
                let substr = ccls[j].join("");
                if (str.indexOf(substr) > -1) {
                    ccfo.push(substr)
                }
            }
        }
        let finalcc : Chain[] = [];
        for (let i = 0; i < ccls.length; i++) {
            let ch = ccls[i];
            let is = false;
            for (let j = 0; j < ccfo.length; j++) {
                let cfo = ccfo[j];
                if (ch.join("") == cfo) {
                    is = true;
                    break
                }
            }
            if (!is) {
                finalcc.push(ch)
            }
        }
        return finalcc
    }

    public static New() : GraphNetwork {
        return new GraphNetwork()
    }
}


