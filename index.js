const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql');
const app=express();


const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:'',
    database:"student"
})


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req,res)=>{

    const query="SELECT * FROM stdtable";
    db.query(query,(err,result)=>{
        res.json(result);
    })

});

app.post('/api/post',(req,res)=>{
    const{name,email,contact}=req.body;
    const query="INSERT INTO stdtable (name,email,contact) VALUES(?,?,?)";
    db.query(query,[name,email,contact],(err,result)=>{
        if(err) return err;
        else{
            return result;
        }
    })

});

app.delete('/api/remove/:id',(req,res)=>{
    const {id}=req.params;
    const query="DELETE FROM stdtable WHERE id = ?";
    db.query(query,id,(err,result)=>{
        if(err) return err;
        else{
            return result;
        }
    })

});

app.get('/api/chk/:id',(req,res)=>{
    const{id}=req.params
    const query="SELECT * FROM stdtable WHERE id=?";
    db.query(query,[id],(err,result)=>{
        res.json(result);
    })

});


app.put('/api/update',(req,res)=>{
    const{name,email,contact,id}=req.body;
    const query="UPDATE stdtable SET name=?,email=?,contact=? WHERE id = ?";
    db.query(query,[name,email,contact,id],(err,result)=>{
        if(err) return err;
        else{
            return result;
        }
    })

});


/*app.get('/',(req,res)=>{
    
    const query="INSERT INTO stdtable (name,email,contact) VALUES('HASAN','HASAN@gmail.com', 12345 )";
    db.query(query,(err,result)=>{
        if(err) return err;
        else{
            console.log(result);
            
        }
    })
    res.send("HELLO WORLD")});
*/
app.listen(5000,()=>{
    console.log('listenings')
})