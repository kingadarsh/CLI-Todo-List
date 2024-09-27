const fs=require('fs');
const readline=require('readline');
const {Command} = require ('commander');
const { log } = require('console');
const program =new Command();

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

program
.name("CLI-Todo")
.description("It is a Command Line Interface based Todo List ")
.version('0.0.0');


program
.command("addtodo")
.description("Add the todo to the list")
.argument('<file>','File to write in')
.action((file)=>{
    rl.question("What do you want to add to todo",(todo)=>{
        fs.appendFile("a.txt",`${todo}\n`,(err)=>{
            if(err){
                console.log("The error is ",err);
                return;
            }
            else{
                console.log(`Todo added is ${todo}`);
            }
            
            rl.close();
        })
        
    
    })
});

// ----------------------------------------------------------

program
.command("showtodo <file>")
.description("Shows all todo added")
.action((file)=>{
    fs.readFile("a.txt","utf-8",(err,data)=>{
    if(err){
        console.log("The error is : ",err);
        return;
    }
    console.log("\nTodo:\n",data);
})})




// ----------------------------------------------------------

program
.command("deletetodo <file> <linenum>")
.description("Specific todo will be deleted")
.action((file,linenum)=>{
    fs.readFile("a.txt","utf-8",(err,data)=>{
        if(err){
            console.log(err);
        }
        const todos=data.split("\n").filter(todo=>todo.trim()!=="");
        const index=parseInt(linenum)-1;

        if(index>=0 && index<todos.length){
            const deletedtodo=todos.splice(index,1);
            console.log(`the todo ${deletedtodo} haas been deleted`);

            fs.writeFile("a.txt",todos.join("\n")+'\n',(err)=>{
                if(err){
                    console.log(err);
                }
        
            });

        }
        else{
            console.log("The line number is incorrect! check again and retry!!!");
        }
    });
  
});

// ----------------------------------------
program.parse(process.argv);

