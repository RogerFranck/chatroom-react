import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Chat:'General',
            Nombre: '',
            Mensaje:'',
            Mensajes:[
            ]
        };
        this.enviar = this.enviar.bind(this);
        this.cambio = this.cambio.bind(this);
        this.UpMensaje = this.UpMensaje.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
    }
    cambio(e){
        const { value, name } = e.target;

        this.setState({
            [name]:value
        })
    }
    enviar(e){
        e.preventDefault();
        document.getElementById("Todo").style.display="none";
        document.getElementById("Chat").style.display="inline";
    }
    handlesubmit(e){
        e.preventDefault();
        const NewMensaje = {
            Id: this.state.Mensajes.length,
            text: this.state.Mensaje,
            name: this.state.Nombre
        }
        window.firebase.database().ref(`Mensajes/${NewMensaje.Id}`)
        .set(NewMensaje);
        this.setState({
            Mensaje:''
        });
    }
    UpMensaje(e){
        this.setState({
            Mensaje: e.target.value
        })
    }

    componentDidMount(){
        window.firebase.database().ref('Mensajes/').on('value',snap => {
            const current = snap.val();
            if (current!==null) {
                this.setState({
                    Mensajes:current
                });
            }
        });
    }
    render(){

        const { Mensajes } = this.state;
        const MensajeList = Mensajes.map(Mensaje =>{
            if (Mensaje.name===this.state.Nombre) {
                return (
                    <div key={ Mensaje.Id } className="iz-chat">
                        <p></p>
                        <p className="chat chat-dr">{ Mensaje.text }</p>
                    </div>
                )   
            }else{
                return (
                    <div key={ Mensaje.Id } className="iz-chat" >
                        <p className="chat chat-iz">{ Mensaje.name } : { Mensaje.text } </p>
                        <p></p>
                    </div>
                )
            }
        });

        return(
        <div>
            <ThemeProvider theme={darkTheme}>
            <div className="Todo" id="Todo">
                <div className="P-iz">
                    <div className="im-g">
                        
                    </div>
                </div>  
                <div className="P-dr">
                    <form className="fm" onSubmit={ this.enviar }>
                        <center>
                        <img 
                            src="http://icons.iconarchive.com/icons/martz90/hex/96/messenger-icon.png"
                            alt="Fondo"
                        />
                        <Typography component="h1" variant="h5">ChatRoom</Typography>
                        </center>
                        <div className="mar">
                        <TextField 
                        id="outlined-basic" 
                        label="Nombre" 
                        variant="outlined"
                        name="Nombre"
                        required
                        fullWidth
                        onChange={this.cambio}
                        /><br/><br/>
                        <Button variant="contained" color="primary" fullWidth type="submit" >
                            Entrar
                        </Button>
                        <center>
                        <p className="firma">Roger - 2020</p>
                        </center>
                        </div>
                    </form>
                </div>
                
            </div>
            <div id="Chat">
                <AppBar position="static">
                    <Toolbar className="bot">
                    <div className="bat"> 
                    <IconButton edge="start"  color="inherit" aria-label="menu" className="bat">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="box">ChatRoom</Typography>
                    </div>
                    <Typography variant="h6"> { this.state.Chat } </Typography>
                    </Toolbar>
                </AppBar>
                <div className="posi">
                <Card>
                    <CardContent className="posi2">
                        <div className="pad">
                           {
                            MensajeList
                           }
                        </div>
                    </CardContent>
                </Card>
                <br></br>
                <Card>
                    <form onSubmit={ this.handlesubmit } autoComplete="off">
                        <CardContent className="btn-posi">
                            <TextField id="standard-basic" label="Mensaje" className="medi" onChange={this.UpMensaje} value={ this.state.Mensaje } />
                            <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} type="submit">
                            enviar
                            </Button>
                        </CardContent>
                    </form>
                </Card>
                </div>
            </div>
            </ThemeProvider>
        </div>
        )
    }
}

export default Login;
