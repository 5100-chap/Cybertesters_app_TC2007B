//
//  CustomTableViewCell.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 02/11/22.
//

import UIKit

class CustomTableViewCell: UITableViewCell {
    
    @IBOutlet weak var vistaFondo: UIView!
    
    @IBOutlet weak var vista2: UIView!
    
    @IBOutlet weak var vista3: UIView!
    
    
    @IBOutlet weak var LbCodigoTaller: UILabel!
    
    @IBOutlet weak var LbTituloTaller: UILabel!
    
    @IBOutlet weak var LbStatus: UILabel!
    
    @IBOutlet weak var LbCampus: UILabel!
    
    @IBOutlet weak var LbPerido: UILabel!
    
    @IBOutlet weak var LbCalif: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initializ
       
        
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
