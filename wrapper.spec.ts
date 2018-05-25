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

gn.AddRelation("A", "B").AddRelation("C", "B").AddRelation("B", "D").AddExtraVertex("E");

let ch = gn.Done().GetAllChains("E");

console.log(ch);