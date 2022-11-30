//
//  ViewControllerTetra2.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 17/10/22.
//

import UIKit

class ViewControllerTetra2: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

    @IBAction func Back(_ sender: UIButton) {
        dismiss(animated: true)
    }
}
