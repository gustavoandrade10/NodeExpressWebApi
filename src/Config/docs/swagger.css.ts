export const SWAGGERCSS = (topbarTitle: string) => {

    return `
        .swagger-ui .topbar { 
            background-color: #3b4151; 
        } 
        
        .swagger-ui .topbar a img {
            display: none;
        }
        
        .swagger-ui .topbar a span { 
            display: none; 
        } 
        
        .swagger-ui .topbar a:after{
            content: "${topbarTitle}";
            margin-left:8px;
        }
    `;
}