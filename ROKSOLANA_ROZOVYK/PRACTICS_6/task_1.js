//object

/* let scroll = {
    position: "Top",
    height: window.innerHeight,
    goTop: function()
    {
        window.scrollTo(0, 0);
        this.position = "Top";
    },
    goBottom: function()
    {
        window.scrollTo(0, this.height);
        this.position = "Bottom";
    },
    goReverse: function()
    {
        if(this.position === "Top")
          this.goBottom();
        else this.goTop();
    }
} */

//constructor

/* function Scroll()
{
    this.position = "Top";
    this.height = window.innerHeight;
}

Scroll.prototype.goTop = function()
{
    window.scrollTo(0, 0);
    this.position = "Top";
}

Scroll.prototype.goBottom = function()
{
    window.scrollTo(0, this.height);
    this.position = "Bottom";
}

Scroll.prototype.goReverse = function()
{
    if(this.position === "Top")
        this.goBottom();
    else this.goTop();
}

let scroll = new Scroll(); */

//ES6 class

class Scroll
{
    constructor(initialPosition)
    {
        this.position = initialPosition;
        this.height = window.innerHeight;
    }

    goTop()
    {
        window.scrollTo(0, 0);
        this.position = "Top";
    }

    goBottom()
    {
        window.scrollTo(0, this.height);
        this.position = "Bottom";
    }

    goReverse()
    {
        if(this.position === "Top")
           this.goBottom();
        else this.goTop();
    }

    goToInitialPosition()
    {
        if(this.position === "Top")
           window.scrollTo(0, 0);
        else window.scrollTo(0, this.height);
    }
}

let scroll = new Scroll("Bottom");
