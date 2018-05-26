/**
 * Copyright 2017-2020 Rex Lee
 *
 * THIS FILE IS PART OF  PROJECT
 * ALL COPYRIGHT RESERVED
 *
 * Created by duguying on 2018/5/25.
 */

import GraphNetwork from "./wrapper"

let gn = GraphNetwork.New();

// gn.AddRelation("A", "B").AddRelation("C", "B").AddRelation("B", "D").AddExtraVertex("E");
gn.AddRelation("D","B").AddRelation("B","A1").AddRelation("E","C").AddRelation("C","A1").AddRelation("F","G").AddRelation("J","G").AddRelation("G","A2").AddRelation("H","A2");

let ch = gn.Done();

// console.log(ch);

// ch.GetGraph().PrintGraph();

let chs = ch.GetAllChains("A1");

console.log(chs);