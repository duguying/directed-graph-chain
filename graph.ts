/**
 * Copyright 2017-2020 Rex Lee
 *
 * THIS FILE IS PART OF  PROJECT
 * ALL COPYRIGHT RESERVED
 *
 * Created by duguying on 2018/5/25.
 */
import Vertex from "./vertex";

export default class Graph {
    private vertexList : Vertex[] = [];
    private adjMatrix : number[][] = [];
    private nVerts : number = 0;
    private vertsNum : number = 0;
    private i : number = 0;
    private j : number = 0;

    public String() : string {
        let c = "        ";
        for (let k = 0; k < this.vertexList.length; k++) {
            c = c + `[${this.vertexList[k].label}]`
        }

        c = c + "\n";

        for (let l = 0; l < this.adjMatrix.length; l++) {
            let line = this.adjMatrix[l];

            c = c + `[${this.vertexList[l].label}]`;

            for (let k = 0; k < line.length; k++) {
                let cell = line[k];
                c = c + `${cell}`
            }

            c = c + "\n";
        }

        return c;
    }

    public GetVertexList() : Vertex[] {
        return this.vertexList;
    }

    public GetVertexListLabel() : string[] {
        let labels : string[] = [];
        for (let k = 0; k < this.vertexList.length; k++) {
            let vertex = this.vertexList[k];
            labels.push(vertex.label);
        }
        return labels;
    }

    public GetAdjMatrix() : number[][] {
        return this.adjMatrix;
    }

    public GetN() : number {
        return this.vertsNum;
    }

    private delEdge(start : number, end : number) {
        this.adjMatrix[start][end] = 0
    }

    public AddEdge(start : number, end : number) {
        this.adjMatrix[start][end] = 1
    }

    public AddVertex(lab : string) {
        this.vertexList[this.nVerts] = Vertex.New(lab);
        this.nVerts++;
    }

    public DisplayVertex(i : number) : string {
        return this.vertexList[i].GetLabel()
    }

    public DisplayVertexVisited(i : number) : boolean {
        return this.vertexList[i].GetWasVisited()
    }

    public PrintGraph() {
        let c = "";

        for (let k = 0; k < this.vertsNum; k++) {
            c = `第 ${this.DisplayVertex(k)} 个节点：`;

            for (let l = 0; l < this.vertsNum; l++) {
                c = c + `[${this.DisplayVertex(k)}-${this.DisplayVertex(l)}]: ${this.adjMatrix[k][l]}`
            }

            c = c + "\n"
        }

        console.log(c)
    }

    private initVertexList() {
        this.vertexList = []; // new (Vertex[this.vertsNum])()
        for (let k = 0; k < this.vertsNum; k++) {
            this.vertexList.push(null)
        }
    }

    private initMatrix() {
        for (let k = 0; k < this.vertsNum; k++) {
            let sl : number[] = [];
            sl = this.fillZero(sl, this.vertsNum);

            this.adjMatrix.push(sl)
        }
    }

    private fillZero(array : number[], len : number) : number[] {
        for (let k = 0; k < len; k++) {
            array[k] = 0
        }
        return array
    }

    public static NewGraph(vertsNum : number) : Graph {
        let g = new Graph();
        g.vertsNum = vertsNum;

        g.initMatrix();
        g.initVertexList();
        g.nVerts = 0;

        return g;
    }

}