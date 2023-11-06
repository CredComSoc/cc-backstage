<template>
<div class="main">
    <div class="center-container">
        <div class="login_box" :class="{ 'fade-in': isAdminLoggedIn }">
        <div class="login_box_header">
            <div class="login_box_header_text">
                Admin Login
            </div>

            
        </div>
        
        <div class="login_box_body">
            <div class="login_box_body_upper">
                
                <div class="login_box_text">
                    E-mail
                </div>
                <div class="input_bar">
                    <input type="text"
                        placeholder="email@something.com"
                       name="search"
                       ref="emailInput">
                </div>
            </div>
            <div class="login_box_body_middle">
                <div class="login_box_text">
                    Password 
                </div>
                <div class="input_bar">
                    <input type="password"
                        placeholder="password"
                        name="password"
                        ref="passwordInput"> 
                </div>
            </div>
            <div class="login_box_body_lower">
                
                <button class="login_button" @click="controlUsr">
                    Login
                </button>



            </div>
        </div>
        <div class="login_box_foot">
        <div class login_box_header_text>
            Need help?
    
        </div>
        </div>
        
        </div>
    </div>

</div>
</template>





<script>

export default
{
    data(){
        return{
            isAdmin: false,
            email: '',
            password: '',
            correctEmail: "admin",
            correctPassword: "admin",
            isAdminLoggedIn: false 
        
        }
    },

    methods:
    {
        controlUsr()
        {
            this.password = this.$refs.passwordInput.value;
            this.email = this.$refs.emailInput.value;
            if(this.email == this.correctEmail && this.password == this.correctPassword)
            {
                console.log("SUCCESSSSSSSS");
                this.$router.push('/admin/admin_overview');
            }
        },
    
    },

    mounted()
    {
        this.isAdminLoggedIn = true;


    }


}

</script>

<style scoped>
.main
{
    font-family: Candara;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw; 
    height: 100vh;
    padding-right: 7%;
}
.center-container
{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 100%;
}
.login_box
{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    width: 60%; 
    height: 70%;
    background-color: rgb(253, 241, 217);
    border-radius: 10px;
}
.login_box_header
{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
}
.login_box_header_text
{
    font-weight: bold;
    font-size: 1.5vw;
    color: black;
        
}
.login_box_body
{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 80%;

}

.login_box_body_upper
{
    width: 100%;
    height: 20%;
    gap: 0.5%;
    padding-left: 5%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
}

.login_box_body_middle
{
    width: 100%;
    height: 20%;
    padding-left: 5%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
}

.login_box_body_lower
{
    
    width: 100%;
    height: 33%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    
}

.login_box_foot
{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid black;
}

.login_box_text
{
    font-size: 1.6vw;
    color: black;
}

.input_bar
{
    
}
.input_bar input 
{
    width: 160%;
    padding-left: 3%;
    border: 1px solid #ccc;
    border-radius: 5px; 
    font-size: 0.9vw; 
}

.login_button
{
    border: 1px solid black;
    border-radius: 20px;
    background-color: rgb(209, 209, 209);
    width: 90%;
    height: 25%;
}
.login_button:hover
{
    background-color: #ccc;
}

.login_button:active
{
    transform: translateY(2.5%);
}


.login_box.fade-in 
{
  opacity: 0;
  transform: translateY(20px);
  animation: fade-in 0.5s ease forwards;
}

@keyframes fade-in 
{
  to {
    opacity: 1;
    transform: translateY(0);
  }
}



</style>