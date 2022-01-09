// 根据交点 求所有封闭区域
let points = [
    {
        x: -44.27454147194787,
        y: -100.46582449580728
    },
    {
        x: 236.2994446382105,
        y: -113.31227053162883
    },
    {
        x: -61.74227343764703,
        y: 93.12712778675007
    },
    {
        x: 187.1817027365604,
        y: 104.4394281548374
    },
    {
        x: 106.8160592500908,
        y: -607.8096163063344
    },
    {
        x: 24.53279104590547,
        y: 161.2772840463685
    },
    {
        x: -44.27454147194787,
        y: -100.46582449580728
    }
]

const lines = []
for(let i = 0;i<points.length-1;i+=1) {
    const start = points[i]
    const end = points[i+1]
    lines.push({
        start,
        end,
        middle:[]
    })
}


// 求两个线段交点的方法
function intersection(from1, to1, from2, to2) {
    const dX = to1.x - from1.x;
    const dY = to1.y - from1.y;

    const determinant = dX * (to2.y - from2.y) - (to2.x - from2.x) * dY;
    if (determinant === 0) return undefined; // parallel lines

    const lambda= ((to2.y - from2.y) * (to2.x - from1.x) + (from2.x - to2.x) * (to2.y - from1.y)) / determinant;
    const gamma = ((from1.y - to1.y) * (to2.x - from1.x) + dX * (to2.y - from1.y)) / determinant;

    // check if there is an intersection
    if (!(0 < lambda && lambda < 1) || !(0 < gamma && gamma < 1)) return undefined;

    return {
      x: from1.x + lambda * dX,
      y: from1.y + lambda * dY,
    };
  }

function line_split(lines) {
    // 获取线段交点 线段分割
    for(let i = 0;i<lines.length-1;i+=1){
        const first = lines[i]
        // 获取第一个线段
        for(let j = i+1;j<lines.length;j+=1) {
            const two = lines[j]
            const intersec = intersection(first.start,first.end,two.start,two.end)
            if(intersec) {
                // TODO 往中间数组塞值，这里需要增加判断，去重判断
                first.middle.push(intersec)
                two.middle.push(intersec)
                points.push(intersec)
            }
        }
    }
}

line_split(lines)

function compare(key){
    return function(value1,value2){
        var val1=value1[key];
        var val2=value2[key];
        return val1-val2;
    }
}

const new_lines = []
// 循环处理线上的分割点
lines.forEach(line=>{
    const start = line.start
    let middle = line.middle
    const end = line.end
    // 对middle数组按照距离排序
    const new_middle = []
    middle = middle.map(item=>{
        const dis =Math.sqrt(Math.pow((item.x - start.x),2)+Math.pow((item.y-start.y),2))
        return {
            dis,
            data:item
        }
    })
    middle.sort(compare('dis'));
    middle = middle.map(item=>item.data)
    middle.unshift(start)
    middle.push(end)
    for(let i = 0;i<middle.length-1;i+=1) {
        const line = {
            start:middle[i],
            end:middle[i+1]
        }
        new_lines.push(line)
    }
})

// console.log('划分出来的线段');
// console.log(new_lines);
// console.log(new_lines.length);



// 顶点和边去重
points =  points.reduce((arr,item)=>{
    if(!arr.find(items=>items.x === item.x && items.y===item.y)){
        arr.push(item)
        return arr
    }else{
        return arr
    }

},[])

// console.log('顶点');
// console.log(points);
// console.log(points.length);


// 获取顶点和相交点的关系
const points_len = points.length
const edges = new Array(points_len).fill(null).map(()=>{return []})

for(let i = 0;i<points.length;i+=1) {
    const point = points[i]
    // 循环边
    for(let j = 0;j<new_lines.length;j+=1) {
        const line = new_lines[j]
        // console.log(line);
        const end = line.end
        const start = line.start
        if(start.x===point.x && start.y===point.y){
            // 找终点下标
            const index = points.findIndex(p=>p.x===end.x && p.y===end.y)
            edges[i].push(index)
        }
    }
}


// 图类
class Graph{
    constructor(v_len) {
        this.v_len = v_len
        this.adj =  new Array(this.v_len).fill(null).map(()=>{return []})// 邻接表
    }

    add_edges(s,e){
        this.adj[s].push(e)
        this.adj[e].push(s)
    }

    // 参数为起点和终点
    bfs(start){
        // 扩展顶点额外信息
        this.adj = this.adj.map(item=>{
            return {
                L:item,
                COLOR:0, // 0-白色 1-灰色 2-黑色
                D:null, // 距离
                P:null, // 上一个节点
                M:[] // 相遇点链表
            }
        })    
        
        // 将起点放进队列
        const queue = [start]
        this.adj[start].COLOR = 1
        this.adj[start].D = 0

        while(queue.length!==0) {
            // 取第一个点 开始操作
            const cur = queue.shift()

            // 获取所有相邻节点
            const cur_list = this.adj[cur].L


            for(let i = 0;i<cur_list.length;i+=1) {
                const node = cur_list[i]
                
                if(this.adj[node].COLOR===0) {// 白色 -设置
                    this.adj[node].COLOR = 1
                    this.adj[node].D = this.adj[cur].D+1
                    this.adj[node].P = cur
                    queue.push(node)
                }else if(this.adj[node].COLOR===1) {// 灰色 -加入相遇链表中
                    // console.log('灰色');
                    this.adj[node].M.push(cur)
                }
                // 黑色 跳过
            }
            this.adj[cur].COLOR = 2
        }

        console.log(this.adj); // 已经找出所有封闭区域 ？？？ 还是没完全理解
        for(let i = 0;i<this.adj.length;i+=1) {
            const obj = this.adj[i]
            let u = i

            if(obj.M.length>0) {
                // 循环
                for(let j = 0;j<obj.M.length;j+=1) {
                    console.log('执行一次');
                    let v = obj.M[j]
                    const dv = this.adj[v].D
                    const du = this.adj[u].D
                    
                    const L = []
                    if(dv===du) {

                        L.push(u)
                        L.push(v)

                        while(1){
                            let pu = this.adj[u].P
                            let pv = this.adj[v].P
                            if(pv===pu) {
                                L.unshift(pv)
                                break;
                            }else{
                                u = pu
                                v = pv
                            }
                        }
                        
                    }else if(dv+1 === du) {
                        let pu = this.adj[u].P
                        L.push(pu)
                        L.push(u)
                        L.push(v)
                        u = pu

                        while(1){
                            pu = this.adj[u].P
                            let pv = this.adj[v].P
                            if(pv===pu) {
                                L.unshift(pv)
                                break;
                            }else{
                                u = pu
                                v = pv
                            }
                        }
                    }
                    if(L.length>0)  console.log(L);
                    
                }
            }
        }
    }

    print_path(s,t,prev){
        console.log(prev);
        const path = [];
        let cur_p = t;
        while (cur_p != -1) {
          path.unshift(prev[cur_p]);
          cur_p = prev[cur_p];
        }
        path.shift()
        path.push(t)
        console.log(path.join("->"));
    }
}

const graph = new Graph(points_len)
for(let i = 0;i<edges.length;i+=1) {
    const end = edges[i]
    const start = i
    end.forEach(item=>{
        graph.add_edges(start,item)
    })
}

graph.bfs(0)